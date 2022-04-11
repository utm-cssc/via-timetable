import Vue from 'vue';
import VueRouter from 'vue-router';
import home from '../views/Home.vue';
import about from '../views/About.vue';
import timetable from '../views/Timetable.vue';
import calendar from '../views/Calendar.vue';
import manager from '../views/Manager.vue';
import course from '../views/Course.vue';
import program from '../views/Program.vue';
import heatmap from '../views/HeatMap.vue'

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'home',
    component: home,
    redirect: { name: 'timetable' },
    children: [
      {
        name: 'timetable',
        path: 'timetable',
        component: timetable,
      },
      {
        name: 'calendar',
        path: 'calendar',
        component: calendar,
      },
      {
        name: 'manager',
        path: 'manager',
        component: manager,
      },
      {
        name: 'course',
        path: 'manager/:id',
        component: course,
      },
      {
        name: 'program',
        path: 'program',
        component: program,
      },
      {
        name: 'heatmap',
        path: 'heatmap',
        component: heatmap,
      },
    ],
  },
  {
    path: '/about',
    name: 'about',
    component: about,
  },
  {
    path: '*',
    redirect: {
      name: 'home',
    },
  },
];

const router = new VueRouter({
  mode: 'history',
  routes,
});

export default router;
