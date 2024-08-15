import { reactive } from "vue"


export function usePagination(initialPaginationData = {}) {
    /** 默认的分页参数 */
    const defaultPaginationData = {
        total: 0,
        currentPage: 1,
        pageSizes: [10, 20, 50],
        pageSize: 10,
        layout: "total, sizes, prev, pager, next, jumper"
    }
    /** 合并分页参数 */
    const pagination = reactive({ ...defaultPaginationData, ...initialPaginationData })
    /** 改变当前页码 */
    const handleCurrentChange = (value) => {
        pagination.currentPage = value
    }
    /** 改变页面大小 */
    const handleSizeChange = (value) => {
        pagination.pageSize = value
    }

    return { pagination, handleCurrentChange, handleSizeChange }
}
