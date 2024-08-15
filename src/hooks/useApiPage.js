/**
 *
 * @param pageApi { Function }
 * @param requestData { Object }, eg: {pageStart, pageSize, pageRequest}
 * @returns {{total: Ref<UnwrapRef<null>>, pageData: Ref<UnwrapRef<null>>, totalPage: Ref<UnwrapRef<null>>, loading: Ref<UnwrapRef<null>>, currentPage: Ref<UnwrapRef<null>>, error: Ref<UnwrapRef<null>>}}
 */
export function useApiPage(pageApi, requestData) {
    const pageData = ref(null)
    const loading = ref(null)
    const total = ref(null)
    const currentPage = ref(null)
    const totalPage = ref(null)
    const error = ref(null)
    loading.value = true
    pageApi(...requestData).then(data => {
        pageData.value = data.records
        total.value = data.total
        currentPage.value = data.current
        totalPage.value = data.pages
    }).catch(err => {
        console.error('API request failed:', err);
        error.value = err
    }).finally(() => {
        loading.value = false
    })
    return {pageData, loading, total, currentPage, totalPage, error}
}
