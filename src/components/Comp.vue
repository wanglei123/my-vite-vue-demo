
<script lang="jsx">
import { ref } from 'vue'

export default {
    setup(){
        const counter = ref(0)
        const onclick = () => {
            counter.value++
        }
        return () => (
            <>
            <div>comp</div>
            <p onclick={onclick}>{counter.value}</p>
            </>
        )
    }
    
}
</script>