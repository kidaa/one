/* globals Files: true, FileTools: true */

Files = new Meteor.Collection('files');

Files.schema = new SimpleSchema({
  //companyId: {type: String, optional: true, regEx: SimpleSchema.RegEx.Id},
  companyDocument: {type: Boolean},
  name: {type: String},
  uploadDate: {type: Date},
  userId: {type: String, regEx: SimpleSchema.RegEx.Id},
  isFolder: {type: Boolean, defaultValue: false},
  /**
   * The parent folder id.
   * Files that have no parent value are in the root folder.
   */
  parent: {type: String, optional: true},
  sharedWith: {type: [SharedWithRule.schema], defaultValue: []}
});

// Can't name this File or it will conflict with the HTML5 File.
FileTools = {};

FileTools.ext = function (fileName) {
  return fileName.substr(fileName.lastIndexOf('.') + 1);
};

FileTools.path = function (file) {
  var folderPath;
  if (file.companyDocument) {
    // TODO: add company_id
    folderPath = Folder.companyDocument('elliman');
  } else {
    folderPath = Folder.userDocument(file.userId);
  }

  return folderPath + '/' + file.name;
};

/**
 * The url of the file.
 * @param file
 */
FileTools.url = function (file) {
  return '/files?path=' + encodeURIComponent(FileTools.path(file));
};

FileTools.deleteStub = function (method, filePath, callback) {
  Meteor.call(method, filePath, function (error, result) {
    if (error) return;

    if(callback)
     callback(null, result);
  });
};
