class APIFeatures {
    constructor(query, queryStr) {
        this.query = query;
        this.queryStr = queryStr;
    }

    search() {
        const keyword = this.queryStr.keyword ? {
            name: {
                $regex: this.queryStr.keyword,
                $options: 'i'
            }
        } : {}

        this.query = this.query.find({ ...keyword });
        return this;
    }

    filter() {
        const queryCopy = { ...this.queryStr };

        // Remove fileds from the query
        const removalFields = ["keyword", "limit", "page"]
        removalFields.forEach(element => delete queryCopy[element])

        // Advance filter for price, ratings etc.
        let queryStr = JSON.stringify(queryCopy)
        queryStr = queryStr.replace(/\b(gt|gte|lte|lt)\b/g, match => `$${match}`)

        this.query = this.query.find(JSON.parse(queryStr))
        return this;
    }

    pagination(resPerPage) {
        const currentPage = Number(this.queryStr.page) || 1
        const skipItems = resPerPage * (currentPage - 1)

        this.query = this.query.limit(resPerPage).skip(skipItems)
        return this;
    }
}

module.exports = APIFeatures