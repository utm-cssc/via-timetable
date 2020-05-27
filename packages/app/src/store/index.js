import Vue from "vue";
import Vuex from "vuex";
import { generateTimetables } from "../timetable-planner";
import genColor from "color-generator"

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        selectedCourses: {},
        timetable: {
            MONDAY: [],
            TUESDAY: [],
            WEDNESDAY: [],
            THURSDAY: [],
            FRIDAY: [],
        },
        lockedSections: [],
    },
    mutations: {
        setTimetable(state, payload) {
            state.timetable = payload;
        },
        addCourse(state, payload) {
            state.selectedCourses[payload.course.courseCode] = payload.course;
        },
        removeCourse(state, payload) {
            Vue.delete(state.selectedCourses, payload.code);
        },
        lockSection(state, payload) {
            state.lockedSections.push(payload);
        },
        unlockSection(state, payload) {
            const index = state.lockedSections.indexOf(payload);
            if (index != -1) {
                state.lockedSections.splice(index, 1);
            }
        },
    },
    actions: {
        selectCourse(context, payload) {
            // generate a color
            const color = genColor(0.7, 0.85).hexString()
            context.commit("addCourse", {
                course: {
                    color,
                    ...payload.course,
                },
            });

            const courses = Object.keys(context.state.selectedCourses).map(
                (code) => context.state.selectedCourses[code]
            );
            const timetable = generateTimetables(courses, context.state.lockedSections);
            context.commit("setTimetable", timetable);
        },
        deleteCourse(context, payload) {
            context.commit("removeCourse", payload);
            //Unlock all sections of deleted course
            for (var lockedSection of context.state.lockedSections) {
                if (lockedSection.includes(payload.code)) {
                    context.commit("unlockSection", lockedSection);
                }
            }
            const courses = Object.keys(context.state.selectedCourses).map(
                (code) => context.state.selectedCourses[code]
            );
            const timetable = generateTimetables(courses, context.state.lockedSections);
            context.commit("setTimetable", timetable);
        },
        resetTimetable(context) {
            const courses = Object.keys(context.state.selectedCourses).map(
                (code) => context.state.selectedCourses[code]
            );
            const timetable = generateTimetables(courses, context.state.lockedSections);
            context.commit("setTimetable", timetable);
        },
        switchSection(context, payload) {
            //Remove old section from locked sections
            context.commit(
                "unlockSection",
                `${payload.old.courseCode}${payload.old.sectionCode}`
            );
            //Remove old section from timetable
            for (let d in context.state.timetable) {
                let day = context.state.timetable[d];
                for (let event of day) {
                    if (
                        `${event.code}${event.sectionCode}` ==
                        `${payload.old.courseCode}${payload.old.sectionCode}`
                    ) {
                        day.splice(day.indexOf(event), 1);
                    }
                }
            }
            //Add new section into timetable
            for (var time of payload.new.times) {
                context.state.timetable[time.day].push({
                    code: payload.old.courseCode,
                    sectionCode: payload.new.sectionCode,
                    instructors: payload.new.instructors,
                    ...time,
                });
                context.state.timetable[time.day].sort((a, b) => {
                    return a.start - b.start;
                });
            }
        },
    },
    modules: {},
    getters: {
        selectedCourses: (state) => {
            return state.selectedCourses;
        },
        timetable: (state) => {
            return state.timetable;
        },
        getCourseColor: (state) => (code) => {
            return state.selectedCourses[code].color;
        },
        getLockedSections: (state) => {
            return state.lockedSections;
        },
    },
});
