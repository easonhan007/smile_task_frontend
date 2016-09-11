<template id="dialog">
  <div class="modal fade" tabindex="-1" role="dialog" id="child-modal" @keyup.enter="create_task">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
          <h4 class="modal-title">{{ dialogTitle }}</h4>
        </div>
        <div class="modal-body">
          <p>{{ dialogContent }}</p>
          <form class="form-horizontal">
            <div :class="title_valid ? 'form-group has-success' : 'form-group'">
              <label for="" class="col-sm-2">标题</label>
              <div class="col-sm-10" for="title">
                <input type="text" id="title" v-model="title" class="form-control" placeholder="必填">
              </div>
            </div>
            <div :class="desc_valid ? 'form-group has-success' : 'form-group'">
              <label for="" class="col-sm-2">描述</label>
              <div class="col-sm-10" for="desc">
                <input type="text" id="desc" v-model="desc" class="form-control" placeholder="必填">
              </div>
            </div>
          </form>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
          <button v-if="title_valid && desc_valid" type="button" class="btn btn-primary" @click="create_task" >创建任务</button>
          <button v-else type="button" class="btn btn-primary" disabled="disabled">创建任务</button>
        </div>
      </div><!-- /.modal-content -->
    </div><!-- /.modal-dialog -->
  </div><!-- /.modal -->
</template>

<script>
  export default {
    props: ['dialogTitle', 'dialogContent'],
    data: function() {
      return {
        title: '',
        desc: '',
        title_valid: false,
        desc_valid: false,
      }
    },
    computed: {
      title_valid: function() {
        return this.title == "" ? false : true
      },
      desc_valid: function() {
        return this.desc == "" ? false : true
      }
    },
    display: function() {
      $('#child-modal').modal('show')
      $('#child-modal').on('shown.bs.modal', function(e){
        $('#title').focus()
      })
    },
    methods: {
      create_task: function() {
        if(this.title == '' || this.desc == '') return
        this.$http.post('http://localhost:3000/api/tasks', {title: this.title, desc: this.desc}).then((response) => {
          console.log(response.data)
          $('#child-modal').modal('hide')
          this.title = this.desc = ''
          this.$dispatch('task_created', response.data)
        },(response) => {
          console.log(response.data)
        }
      )},
    }
  }
</script>
