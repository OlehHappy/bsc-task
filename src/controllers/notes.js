import _ from 'lodash';

export default function($scope, noteFactory) {
    let params = {
        createHasInput: false
    };

    noteFactory.getNotes($scope);


    $scope.onEditClick = note => {
        note.isEditing = true;
        note.updatedNote = note.title;
    };

    $scope.onCancelClick = note => {
        note.isEditing = false;
    };

    const { createNote, updateNote, deleteNote, watchCreateNoteInput } = noteFactory;

    $scope.createNote = _.partial(createNote, $scope, params);
    $scope.updateNote = _.partial(updateNote, $scope);
    $scope.deleteNote = _.partial(deleteNote, $scope);
    $scope.$watch('createNoteInput', _.partial(watchCreateNoteInput, params, $scope));
}
