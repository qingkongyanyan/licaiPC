/**
 * Created by user on 2016/7/18.
 */
"use strict"
app.constant("knowledge_config",[
    {
        name: "knowledge.comProblemController",
        module: true,
        files: [
            "knowledge/scripts/controllers/comProblem.controller.js",
            "knowledge/scripts/services/comProblemService.js",
            "knowledge/scripts/filter/comProblemFilter.js",
            "knowledge/scripts/services/comProblemEnum_service.js",
            "common/scripts/directives/ueditor.directive.js"
        ]
    },
    {
        name: "knowledge.agreementController",
        module: true,
        files: [
            "knowledge/scripts/controllers/agreement.controller.js",
            "knowledge/scripts/services/agreementService.js",
            "knowledge/scripts/filter/comProblemFilter.js",
            "knowledge/scripts/services/comProblemEnum_service.js",
            "common/scripts/directives/ueditor.directive.js"
        ]
    },
    {
        name: "knowledge.examPaperController",
        module: true,
        files: [
            "knowledge/scripts/controllers/examPaper.controller.js",
            "knowledge/scripts/services/examPaperService.js",
            "knowledge/scripts/services/examPaperEnum_service.js",
            "knowledge/scripts/filter/comProblemFilter.js"
        ]
    }
]);