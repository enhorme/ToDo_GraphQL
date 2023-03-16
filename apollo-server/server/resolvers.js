import Todo from './models/Todo.js';

const resolvers = {
    Query:{
        welcome:()=>{
            return 'welcome to todo'
        },
        getTodos:async ()=> await Todo.find(),
        getTodo:async (root,{id})=>await Todo.findById(id)
    },
    Mutation:{
        addTodo:async (root,args)=>{
             const newTodo = new Todo({title: args.title, detail: args.detail, date: args.date});
             await newTodo.save();
             return newTodo
        },
        deleteTodo:async (root, {id})=>{
            await Todo.findByIdAndDelete(id)
            return 'Todo has deleted'
        },
        updateTodo:async (root, args)=>{
            const updateTodo = {}

            for(let [key,value] of Object.entries(args)) {
                if(value !== undefined) {
                   updateTodo[key] = value
                }
            }
            const todo = await Todo.findByIdAndUpdate(args.id,updateTodo, {new:true})
            return todo;
        }

    }
                                                    
}

export default resolvers