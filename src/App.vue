<template>
  <v-app>
    <v-container>
      <v-card>
        <v-card-title>
          Harga Emas Pegadaian
          <v-spacer></v-spacer>
          <v-text-field
            v-model="search"
            append-icon="mdi-magnify"
            label="Search"
            single-line
            hide-details
          ></v-text-field>
          <div class>
            <v-btn outlined color="primary" class="mt-5 ml-2" @click="refresh">Refresh</v-btn>
          </div>
        </v-card-title>
        <v-data-table :headers="headers" :items="body" :search="search"></v-data-table>

        <v-snackbar v-model="snackbar">
          {{ text }}
          <template v-slot:action="{ attrs }">
            <v-btn color="red" text v-bind="attrs" @click="snackbar = false">Close</v-btn>
          </template>
        </v-snackbar>
      </v-card>
    </v-container>
  </v-app>
</template>

<script>
import firebase from "firebase/app";
import "firebase/database";

export default {
  data() {
    return {
      search: "",
      snackbar: false,
      text: "Berhasil di refresh",
      headers: [
        {
          text: "Satuan",
          align: "start",
          value: "satuan"
        },
        { text: "Harga Antam", value: "hargaAntam" },
        { text: "Harga Antam Retro", value: "hargaAntamRetro" },
        { text: "Harga Antam Batik", value: "hargaAntamBatik" },
        { text: "Harga UBS", value: "hargaUBS" }
      ],
      body: []
    };
  },
  mounted() {
    firebase
      .database()
      .ref("goldData")
      .on("value", data => {
        this.body = data.val();
      });
  },
  methods: {
    refresh() {
      firebase
        .database()
        .ref("refresh")
        .update({ refresh: true })
        .then((this.snackbar = true));
    }
  }
};
</script>
