<template>
  <div>
    <v-btn 
    class="mr-1" 
    icon
    @click="dialog = true">
      <v-icon>mdi-bell</v-icon>
    </v-btn>
    <v-dialog
      v-model="dialog"
      max-width="600px"
    >
      <v-card height="600px" class="d-flex flex-column">
        <v-card-title>
          <span class="text-h5">Create Email Notification</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-text-field
                  v-model="recipientEmail"
                  label="Email"
                  hint="Email to send the notification to"
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <vc-date-picker mode="dateTime" v-model="notificationDate" >
                  <template v-slot="{ inputValue, inputEvents }">
                    <v-text-field
                      :value="inputValue" 
                      v-on="inputEvents"
                      label="Notification Date"
                    ></v-text-field>
                  </template>
                </vc-date-picker>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-spacer></v-spacer>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="blue darken-1"
            text
            @click="dialog=false"
          >
            Close
          </v-btn>
          <v-btn
            color="blue darken-1"
            text
            @click="createNotification()"
          >
            Save
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>

import axios from 'axios'

export default {
  data () {
    return {
      dialog: false,
      notificationDate: null,
      recipientEmail: null,
    }
  },
  props: {
    assessmentName: String,
    assessmentDate: Number,
    assessmentDetails: String,
    assessmentCategory: String,
  },
  methods: {
    async createNotification() {
      try {
        await axios.post(`http://localhost:3000/create-notification`, {
          notificationDate: this.notificationDate,
          recipientEmail: this.recipientEmail,
          assessmentName: this.assessmentName,
          assessmentDate: this.assessmentDate,
          assessmentDetails: this.assessmentDetails,
          assessmentCategory: this.assessmentCategory,
        })
      } catch (e) {
        console.log(e.message)
      }
      this.dialog = false
    }
  },
}
</script>