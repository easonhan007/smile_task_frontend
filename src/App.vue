<template>
  <div id="app">
    <h3 class="text-center">Smile TODO</h3>
    <button class="btn btn-primary" @click="show_create_form">创建</button>
    <table class="table">
      <thead>
        <tr>
          <th>ID</th>
          <th>标题</th>
          <th>描述</th>
          <th></th>
          <th>操作</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="task in tasks" :class="task.done ? 'done': ''">
          <td>{{ task.id }}</td>
          <td>{{ task.title }}</td>
          <td>{{ task.desc }}</td>
          <td><button v-show="!task.done" class="btn btn-success btn-xs" @click="complete_task(task.id)" :disabled="task.done ? true: false">完成</button></td>
          <td><button v-show="!task.done" class="btn btn-danger btn-xs" @click="delete_task(task.id)" :disabled="task.done ? true: false">删除</button></td>
        </tr>
      </tbody>
    </table>
  </div>
  <dialog :dialog-title="d_title" :dialog-content="d_content"></dialog>
</template>


<script>
import Hello from './components/Hello'
import Dialog from './components/Dialog'

export default {
  components: {
    Dialog
  },
  data: function() {
    return {
      all_tasks_url: 'http://localhost:3000/api/tasks',
      tasks: [],
      d_title: '新建任务',
      d_content: '开始新建一个任务吧'
    }
  },
  ready: function() {
    this.$http.get(this.all_tasks_url).then((response) => {
      this.tasks = response.data;
      console.log(this.tasks);
    }, (response) => {
      console.log(response);
    });
  },
  methods: {
    delete_task: function(task_id) {
      if(confirm('Are you sure?')) {
        // console.log(this.tasks);
        var delete_task_url = 'http://localhost:3000/api/tasks/' + task_id;
        console.log(delete_task_url)
        for(var task of this.tasks) {
          if (task.id == task_id) {
            let index = this.tasks.indexOf(task)
            this.tasks.splice(index, 1)
            break
          }
        }
        this.$http.delete(delete_task_url).then((response) => {
          console.log(response.data);
        }, (response) => {
          console.log(response);
        });
      }
    },
    complete_task: function(task_id) {
      for(var task of this.tasks) {
        if (task.id == task_id) {
          task.done = true
          break
        }
      }
    },
    show_create_form: function() {
      Dialog.display()
    }
  },
  events: {
    task_created: function(new_task) {
      this.tasks.unshift(new_task)
    }
  }
}
</script>

<style>
  #app h3 {
    margin: 2em;
  }
  .done {
    text-decoration:line-through;
    color: gray;
  }
</style>
