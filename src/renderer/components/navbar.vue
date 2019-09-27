<template>

  <div>
    <b-nav tabs justified>
      <b-nav-item>
        <router-link class="btn" to="/mainTable">عرض المعاملات</router-link>
      </b-nav-item>
      <b-nav-item>
        <router-link class="btn" to="/addMove">أضف فاتورة</router-link>
      </b-nav-item>
      <b-nav-item>
        <router-link class="btn" to="/addClient">أضف عميل</router-link>
      </b-nav-item>
      <b-nav-item>
        <router-link class="btn" to="/addDrug">أضف دواء</router-link>
      </b-nav-item>
    </b-nav>
  </div>
</template>
<style >
.navbar .router-link-exact-active {
  color: red;
}
</style>