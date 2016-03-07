import _ from 'lodash';
import angular from 'angular';

const noteFactory = angular.module('app.noteFactory', [])

.factory('noteFactory', ($http) => {
    function getNotes($scope) {
        $http.get('/notes').success(response => {
            $scope.notes = response.notes;
        });
    }

    function createNote($scope, params) {
        if (!$scope.createNoteInput) { return; }

        $http.post('/notes', {
            title: $scope.createNoteInput,
            isEditing: false
        }).success(response => {
            getNotes($scope);
            $scope.createNoteInput = '';
        });
    }

    function updateNote($scope, note) {
        $http.put(`/notes/${note._id}`, { title: note.updatedNote }).success(response => {
            getNotes($scope);
            note.isEditing = false;
        });

    }

    function deleteNote($scope, note) {
        $http.delete(`/notes/${note._id}`).success(response => {
            getNotes($scope);
        });

    }

    function watchCreateNoteInput(params, $scope, val) {
        const createHasInput = params.createHasInput;

        if (!val && createHasInput) {
            $scope.notes.pop();
            params.createHasInput = false;
        } else if (val && !createHasInput) {
            $scope.notes.push({ title: val });
            params.createHasInput = true;
        } else if (val && createHasInput) {
            $scope.notes[$scope.notes.length - 1].title = val;
        }
    }

    return {
        getNotes,
        createNote,
        updateNote,
        deleteNote,
        watchCreateNoteInput
    };
});

export default noteFactory;
