<template>
    <div v-if="smoothie" class="edit-smoothie container">
        <h2>Edit{{smoothie.title}} Smoothie</h2>
      <form @submit.prevent="EditSmoothie">
        <div class="field title">
          <label for="title">Smoothie Title:
            <input type="text" name="title" v-model="smoothie.title">
          </label>
        </div>
        <div v-for="(ing,index) in smoothie.ingredients" :key="index" class="field">
          <label for="ingredient">
            Ingredient:
            <input type="text" name="ingredient" v-model="smoothie.ingredients[index]">
            <i class="material-icons delete" @click="deleteIng(ing)">delete</i>
          </label>
        </div>
        <div class="field add-ingredient">
          <label for="add-ingredient">Add an ingredient:
            <input type="text" name="add-ingredient" @keydown.tab="addIng" v-model="another">
          </label>
        </div>
        <div class="field center-align">
          <p v-if="feedback" class="red-text">{{feedback}}</p>
          <button  class="btn pink">Update smoothie</button>
        </div>
      </form>
    </div>
</template>

<script>
import db from '@/firebase/init'
import slugify from 'slugify'
export default {
  name: "EditSmoothie",
  data(){
    return{
      smoothie:null,
      another:null,
      feedback:null,
    }
  },
  created() {
   let ref = db.collection('smoothies').where('slug','==',this.$route.params.smoothie_slug);
   ref.get().then(snapshot=>{
     snapshot.forEach(doc=>{
       this.smoothie = doc.data();
       this.smoothie.id = doc.id;
     })
   })
  },
  methods:{
    addIng(){
      if(this.another){
        this.smoothie.ingredients.push(this.another)
        this.another = null
        this.feedback = null
      }else {
        this.feedback = "You must enter a value to add an ingredient"
      }
    },
    deleteIng(ing){
      this.smoothie.ingredients = this.smoothie.ingredients.filter(ingredient=>ingredient !== ing)
    },
    EditSmoothie(){
      if(this.smoothie.title){
        this.feedback = null
        // create slug
        this.addSlug();
        // save smoothie to DB
        this.saveSmoothie()
      }else {
        this.feedback = 'You must enter a smoothie title'
      }
    },
    saveSmoothie(){
      db.collection('smoothies').doc(this.smoothie.id).update({
        title:this.smoothie.title,
        ingredients:this.smoothie.ingredients,
        slug:this.smoothie.slug
      }).then(()=>{
        this.$router.push({name:'Index'})
      }).catch(console.error)
    },
    addSlug(){
      this.smoothie.slug = slugify(this.smoothie.title,{
        replacement:'-',
        remove: /[$*_+~.()'"!\-:@]/g,
        lower:true
      })
    }
  }
}
</script>

<style scoped>
.edit-smoothie{
  margin-bottom: 60px;
  padding: 20px;
  max-width: 500px;
}
.edit-smoothie h2 {
  font-size: 2em;
  margin: 20px auto;
}
.edit-smoothie .field {
  margin: 20px auto;
  position: relative;
}
.edit-smoothie .delete {
  position: absolute;
  right: 0;
  bottom: 16px;
  font-size: 1.4em;
  cursor: pointer;
}
</style>
