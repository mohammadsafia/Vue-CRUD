<template>
   <div class="add-smoothie container">
     <h2 class="center-align indigo-text">Add New Smoothie Recipe</h2>
     <form @submit.prevent="AddSmoothie">
       <div class="field title">
         <label for="title">Smoothie Title:
           <input type="text" name="title" v-model="title">
         </label>
       </div>
       <div v-for="(ing,index) in ingredients" :key="index" class="field">
         <label for="ingredient">
           Ingredient:
           <input type="text" name="ingredient" v-model="ingredients[index]">
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
         <button  class="btn pink">Add smoothie</button>
       </div>
     </form>
   </div>

</template>

<script>
import db from '@/firebase/init'
import slugify from 'slugify'
export default {
  name: "AddSmoothie",
  data(){
    return{
      title:null,
      another:null,
      ingredients:[],
      feedback:null,
      slug:null
    }
  },
  methods:{
    AddSmoothie(){
      if(this.title){
        this.feedback = null
        // create slug
        this.addSlug();
        // save smoothie to DB
        this.saveSmoothie()
      }else {
        this.feedback = 'You must enter a smoothie title'
      }
    },
    addIng(){
      if(this.another){
        this.ingredients.push(this.another)
        this.another = null
        this.feedback = null
      }else {
        this.feedback = "You must enter a value to add an ingredient"
      }
    },
    deleteIng(ing){
      this.ingredients = this.ingredients.filter(ingredient=>ingredient !== ing)
    },
    saveSmoothie(){
      db.collection('smoothies').add({
        title:this.title,
        ingredients:this.ingredients,
        slug:this.slug
      }).then(()=>{
        this.$router.push({name:'Index'})
      }).catch(console.error)
    },
    addSlug(){
      this.slug = slugify(this.title,{
        replacement:'-',
        remove: /[$*_+~.()'"!\-:@]/g,
        lower:true
      })
    }
  }
}
</script>

<style scoped>
  .add-smoothie{
    margin-bottom: 60px;
    padding: 20px;
    max-width: 500px;
  }
  .add-smoothie h2 {
    font-size: 2em;
    margin: 20px auto;
  }
  .add-smoothie .field {
    margin: 20px auto;
    position: relative;
  }
  .add-smoothie .delete {
    position: absolute;
    right: 0;
    bottom: 16px;
    font-size: 1.4em;
    cursor: pointer;
  }
</style>
