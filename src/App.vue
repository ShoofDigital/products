<template>
  <v-card class="mx-auto" max-width="448">
    <v-layout>
      <v-app-bar color="primary" density="compact">
        <template v-slot:prepend>
          <v-app-bar :elevation="2"></v-app-bar>
        </template>

        <v-app-bar-title>Shoof Salsify API</v-app-bar-title>

        <template v-slot:append>
          <v-btn icon="mdi-dots-vertical"></v-btn>
        </template>
      </v-app-bar>
    </v-layout>
  </v-card>

  <v-container class="bg-surface-variant">
    <v-row no-gutters>
      <v-col cols="12" sm="4">
        <v-sheet class="ma-2 pa-2"> One of three columns </v-sheet>
      </v-col>

      <v-col cols="12" sm="4">
        <v-sheet class="ma-2 pa-2"> One of three columns </v-sheet>
      </v-col>
    </v-row>
  </v-container>

  <v-sheet width="300" class="mx-auto">
    <v-form @submit.prevent>
      <v-text-field
        v-model="sku"
        :rules="rules"
        label="SKU Code"
        required
      ></v-text-field>
      <v-btn
        prepend-icon="mdi-check-circle"
        size="large"
        type="submit"
        block
        class="mt-2"
        @click="getApiData"
        >Submit</v-btn
      >
    </v-form>
  </v-sheet>

  <v-divider class="my-5"></v-divider>



  <v-card width="600" class="my-5 mx-auto">
    <v-card-item>
      <v-card-title>Code: {{ sku }}</v-card-title>
      <v-card-subtitle>(NZ) Name: {{ product.name["en-NZ"] }}</v-card-subtitle>
    </v-card-item>
  </v-card>


  <v-card width="600" class="mx-auto">

      <v-card-text v-if="product.description">
      <div v-html="product.description['en-NZ']"></div>

      <v-divider class="my-5"></v-divider>

      <strong>AG Category:</strong>
      {{ product["Ag Category"] }}
    </v-card-text>


  </v-card>



  <!--
  <form @submit.prevent="onSubmit">
    <input v-model="sku" placeholder="Enter SKU">
    <div>{{ sku }}</div>
    <button @click="getApiData">Submit</button>
  </form> -->

  <div>
    <!-- <img v-if="product['salsify:digital_assets'][0]['salsify:url']" v-bind:src="product['salsify:digital_assets'][0]['salsify:url']" alt="" width="200" height="200"> -->

    <div v-for="image in product['salsify:digital_assets']" :key="image.id">
      <img
        v-if="image['salsify:format'] == 'jpg'"
        v-bind:src="image['salsify:url']"
        width="200"
        height="200"
      />
    </div>

    <div v-for="image in product['salsify:digital_assets']" :key="image.id">
      <!-- <img v-if="image['salsify:format'] == 'pdf'" v-bind:src="image['salsify:url']" width="200" height="200"/> -->
      <a
        v-if="image['salsify:format'] == 'pdf'"
        v-bind:href="image['salsify:url']"
        target="_blank"
        >{{ image["salsify:filename"] }}</a
      >
    </div>

    <p>
      Product.salsify: {{ product["salsify:digital_assets"][0]["salsify:url"] }}
    </p>

    <p>Ag Category: {{ product["Ag Category"] }}</p>
    <p><strong>(NZ) Name:</strong> {{ product.name["en-NZ"] }}</p>
    <p><strong>(AU) Name:</strong> {{ product.name["en-AU"] }}</p>
    <p v-if="product.name['es-CL']">
      <strong>(CL) Name: </strong>{{ product.name["es-CL"] }}
    </p>

    <p>Brand: {{ product.brand }}</p>

    <p v-if="product.description">
      Description: {{ product.description["es-CL"] }}
    </p>
    <p v-if="product.description_vet">
      Vet Description: {{ product.description_vet }}
    </p>
    <p>Bullets: {{ product.feature_bullets }}</p>
    <ul>
      <li v-for="name in product.feature_bullets" :key="name.id">{{ name }}</li>
    </ul>
    <p>NZ Retail Price: NZD${{ product.cam1_re_price }}</p>
    <p>NZ Dealer Price: NZD${{ product.cam1_de_price }}</p>
    <p>NZ Vet Price: NZD${{ product.cam1_vt_price }}</p>
    <p>AU Retail Price: AUD${{ product.mel1_re_price }}</p>
    <p>AU Dealer Price: AUD${{ product.mel1_de_price }}</p>
    <p>CL Retail Price: CLP${{ product.oso1_re_price }}</p>
    <p>CL Dealer Price: CLP${{ product.oso1_de_price }}</p>
    <p>Related Products: {{ product.related_products }}</p>
    <a v-bind:href="salsify_base + sku" target="_blank">Check ME</a>
  </div>
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'
import axios from "axios";

export default {
  name: "App",
  // components: {
  //   HelloWorld
  // },
  data() {
    return {
      AuthStr: "Bearer YdYhJ1u7w9-iILjMzSDq6ZWKWh0qOiftFGJlrWf1hrg",
      salsify_base: "https://app.salsify.com/app/orgs/s-9025b426-275f-4281-a173-dbc64b326c74/products/v2/",
      url_base: "http://localhost:8080/api/v1/orgs/s-9025b426-275f-4281-a173-dbc64b326c74/products/",
      sku: "221967",
      data: {},
      product: {
        name: {},
        description: "",
        description_vet: "",
        // description: {
        //   ['en-NZ']: '',
        //   ['en-AU']: '',
        //   ['es-CL']: ''
        // },
        ["salsify:digital_assets"]: [["salsify:url"]],
      },
    };
  },

  methods: {
    getApiData() {
      axios
        .get(this.url_base + this.sku, {
          headers: { Authorization: this.AuthStr, accept: "application/json" },
        })
        .then((response) => {
          this.product = response.data;
          console.log(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },

  created() {
    this.getApiData();
  },
};
</script>

<style>
#app {
  /* font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: left;
  color: #2c3e50; */
  margin-top: 60px;
}

p {
  margin: 10px 0;
}
</style>
