<template>
  <v-card class="pb-12">
    <v-caard-actions class="d-flex justifity-end pa-2">
      <v-btn icon @click="closedDialog">
        <v-icon size="20px">mdi-close</v-icon>
      </v-btn>
    </v-caard-actions>
    <v-card-text>
      <DialogSection icon="mdi-square" :color="event.color || 'blue'">
        <v-text-field v-model="name" label="タイトル"></v-text-field>
      </DialogSection>
      <DialogSection icon="mdi-click-outline">
        <DateForm v-model="startDate" />
        <DateForm v-model="endDate" />
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
import { format } from 'date-fns';

export default {
  name: 'EventFormDialog',
  components: {
    DialogSection,
    DateForm,
  },
  data: () => ({
    name: '',
    startDate: null,
    endDate: null,
  }),
  computed: {
    ...mapGetters('events', ['event']),
  },
  created() {
    this.startDate = format(this.event.start, 'yyyy/MM/dd');
    this.endDate = format(this.event.end, 'yyyy/MM/dd');
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
        start: this.startDate,
        end: this.endDate,
      };
      this.createEvent(params);
      this.closeDialog();
    },
  },
};
</script>
