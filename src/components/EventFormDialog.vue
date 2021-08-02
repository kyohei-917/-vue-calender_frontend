<template>
  <v-card class="pb-12">
    <v-caard-actions class="d-flex justifity-end pa-2">
      <v-btn icon @click="closedDialog">
        <v-icon size="20px">mdi-close</v-icon>
      </v-btn>
    </v-caard-actions>
    <v-card-text>
      <DialogSection icon="mdi-square" :color="event.color">
        <v-text-field v-model="name" label="タイトル"></v-text-field>
      </DialogSection>
      <DialogSection icon="mdi-click-outline">
        <DateForm v-model="startDate" />
        <TimeForm v-model="startTime" />
        <DateForm v-model="endDate" />
        <TimeForm v-model="endTIme" />
      </DialogSection>
      <v-card-actios class="d-flex justify-end">
        <v-btn @click="submit">保存</v-btn>
      </v-card-actios>
    </v-card-text>
  </v-card>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import DialogSection from './DialogSection';
import DateForm from './DateForm';
import TimeForm from './TimeForm';

export default {
  name: 'EventFormDialog',
  components: {
    DialogSection,
    DateForm,
    TimeForm,
  },
  data: () => ({
    name: '',
    startDate: null,
    startTime: null,
    endDate: null,
    endTime: null,
  }),
  computed: {
    ...mapGetters('events', ['event']),
  },
  created() {
    this.startDate = this.event.startDate;
    this.startTime = this.event.startTime;
    this.endDate = this.event.endDate;
    this.endTime = this.event.endTime;
  },
  methods: {
    ...mapActions('events', ['setEvent', 'setEditMode', 'createEvent']),
    closeDialog() {
      this.setEditMode(false);
      this.setEvent(null);
    },
    submit() {
      const params = {
        name: this.name,
        start: `${this.startDate} ${this.startTime || ''}`,
        end: `${this.endDate} ${this.endTime || ''}`,
      };
      this.createEvent(params);
      this.closeDialog();
    },
  },
};
</script>
