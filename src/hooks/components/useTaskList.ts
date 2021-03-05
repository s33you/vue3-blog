import { dateFormat } from '@/utils/tool';
import { onMounted, ref } from 'vue'
function useTaskList(){
    const time = ref(dateFormat("hh:mm:ss", new Date()));
    onMounted(() => {
        setInterval(() => {
            time.value = dateFormat("hh:mm:ss", new Date());
        }, 1000);
    });
    return {time}
}
export default useTaskList