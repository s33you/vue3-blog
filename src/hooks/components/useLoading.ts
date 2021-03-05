import { ref, watch  } from "vue";

function useLoading() {
    let progress = ref(0);
    let entered = ref(false);
    let loaded = ref(false);
    let timer = setInterval(() => {
        progress.value = page_progress;
    }, 0);

    let enter = () => {
        entered.value = true;
    };
    watch(progress, (value) => {
        if (value == 1 && !loaded.value) {
            clearInterval(timer);
            setTimeout(() => {
                loaded.value = true;
            }, 100);
        }
    });
    return { progress, loaded, enter, entered };
}
export default useLoading