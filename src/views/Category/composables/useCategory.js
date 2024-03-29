//封装分类数据业务代码
import { ref, onMounted } from "vue";
import { getCategoryAPI } from '@/apis/category'
import { useRoute } from 'vue-router'
import { onBeforeRouteUpdate } from 'vue-router'

export function useCategory() {
    const categoryData = ref({})
    const route = useRoute()
    const getCategory = async (id = route.params.id) => {
        const res = await getCategoryAPI(id)
        console.log(res)
        categoryData.value = res.result
    }

    onMounted(()=> getCategory())

//目标：路由参数变化的时候，可以把分类数据接口重新发送
//获取banner
    onBeforeRouteUpdate((to) => {
    console.log('路由变化了')
    //存在问题：使用最新的路由参数请求最新的分类数据
        getCategory(to.params.id)
    })

    return {
        categoryData
    }
}
