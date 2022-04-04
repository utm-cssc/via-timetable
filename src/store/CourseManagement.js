import api from '../plugins/api';

export default {
  mutations: {
    addAssessmentToCourse(state, payload) {
      if (!payload.course.assessments) {
        payload.course.assessments = [];
      }

      if (!payload.assessment.grade) {
        payload.assessment.grade = null
      }
      
      payload.assessment.subtasks = [];

      payload.course.assessments.push(payload.assessment);
    },
    editAssessment(state, payload) {
      if (payload.courseCode[8] === 'F' || payload.courseCode[8] === 'Y') {
        state.fallSelectedCourses[payload.courseCode].assessments[payload.index] = payload.assessment;
        if (payload.assessment.deadline !== null) this.commit('editCourseAssessmentEvent', payload);
      }
      if (payload.courseCode[8] === 'S' || payload.courseCode[8] === 'Y') {
        state.winterSelectedCourses[payload.courseCode].assessments[payload.index] = payload.assessment;
        if (payload.assessment.deadline !== null) this.commit('editCourseAssessmentEvent', payload);
      }
    },
    deleteAssessment(state, payload) {
      if (payload.courseCode[8] === 'F' || payload.courseCode[8] === 'Y') {
        this.commit('deleteCourseAssessmentEvent', {
          name: state.fallSelectedCourses[payload.courseCode].assessments[payload.index].type,
          course: payload.courseCode,
          details: `${state.fallSelectedCourses[payload.courseCode].assessments[payload.index].description} \n\nWeight: ${state.fallSelectedCourses[payload.courseCode].assessments[payload.index].weight}`
        });
        state.fallSelectedCourses[payload.courseCode].assessments.splice(payload.index, 1);
      }
      if (payload.courseCode[8] === 'S' || payload.courseCode[8] === 'Y') {
        this.commit('deleteCourseAssessmentEvent', {
          name: state.winterSelectedCourses[payload.courseCode].assessments[payload.index].type,
          course: payload.courseCode,
          details: `${state.winterSelectedCourses[payload.courseCode].assessments[payload.index].description} \n\nWeight: ${state.winterSelectedCourses[payload.courseCode].assessments[payload.index].weight}`
        });
        state.winterSelectedCourses[payload.courseCode].assessments.splice(payload.index, 1);
      }
    },
  },
  actions: {
    addAssessment({commit, state}, payload) {
      if (payload.courseCode[8] === 'F' || payload.courseCode[8] === 'Y') {
        commit('addAssessmentToCourse', {
          course: state.fallSelectedCourses[payload.courseCode],
          assessment: payload.assessment
        })
      } 
      if (payload.courseCode[8] === 'S' || payload.courseCode[8] === 'Y') {
        commit('addAssessmentToCourse', {
          course: state.winterSelectedCourses[payload.courseCode],
          assessment: payload.assessment
        })
      }

      if (payload.assessment.deadline) {
        commit('createCalendarEvent', {
          eventName: payload.assessment.type,
          eventWeight: payload.assessment.weight,
          eventCourse: payload.courseCode,
          eventDetails: payload.assessment.description,
          eventDate: new Date(payload.assessment.deadline)
        });
      }
    },

    async importAssessmentFromParser({ dispatch }, payload) {
      await api.post('/manager/parser', payload.file, {
        'Content-Type': 'multipart/form-data',
      }).then(res => {
        res.data.forEach((event) => {
          dispatch('addAssessment', {
            courseCode: payload.courseCode,
            assessment: event,
          });
        })
      })
    }
  }
}