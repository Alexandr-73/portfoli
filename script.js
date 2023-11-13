const todoItem = {
   // props: ["todo", "index"],
   props: {
    todo: { 
    type: Object,
    required: false,
    default: {},
    validator: function(value) {
        return value.userId > 0
        },
      },
      index: {
        type: Number,
        required: true,
        validator: function (value) {
            return value > 100;
        },
      },
   },
    emits: ["complete-todo"],
    methods: {
        makeComplete() {
            this.$emit("complete-todo")
        
      },
    },
    template: `
    <div> {{ index}} - {{ todo.title }}
        <input type="checkbox" :checked="todo.completed"
        @click="makeComplete" />
    </div>
    
    `,
};

const app = Vue.createApp({
    data() {
        return{
            todoList: [],
        };
    },
    components: {
       "todo-item": todoItem,
    },
    methods: {
        makeDone(index){

            console.log("before", this.todoList[index])
            this.todoList[index].completed = !this.todoList[index].completed
            console.log("after", this.todoList[index])
        },
    },
    mounted() {
    fetch('https://jsonplaceholder.typicode.com/todos/')
      .then((response) => response.json())
      .then((json) => (this.todoList = json));
    },
});

app.mount("#app");
