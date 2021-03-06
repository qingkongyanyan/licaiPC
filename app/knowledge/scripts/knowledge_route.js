//知识库管理总模块
angular.module('knowledge.route',['ui.router',
    'comProblem.route',
    'agreement.route',
    'examPaper.route']);

//知识库管理->常见问题管理模块
angular.module('comProblem.route',['ui.router'])
.config(["$stateProvider","$urlRouterProvider",function($stateProvider, $urlRouterProvider) {
    $stateProvider
        //****************************常见问题管理模块******************************
        .state('index.comProblem',{
            url:'/comProblem',
            abstract:true,
            templateUrl:'knowledge/views/comProblem/comProblem.html',
            controller:'comProblemController',
            resolve:{
                deps:['$ocLazyLoad',function($ocLazyLoad){
                    return $ocLazyLoad.load('knowledge.comProblemController');
                }]
            }
        })
        //常见问题列表
        .state('index.comProblem.list',{
            url:'',
            templateUrl:'knowledge/views/comProblem/list.html',
            controller:'comProblemListController'
        })
        //添加常见问题
        .state("index.comProblem.add",{
            url:"/add",
            templateUrl:"knowledge/views/comProblem/add.html",
            controller:"comProblemAddController"
        })
        //修改常见问题
        .state("index.comProblem.update",{
            url:"/update/:id",
            templateUrl:"knowledge/views/comProblem/edit.html",
            controller:"comProblemEditController"
        })
        //常见问题详细
        .state("index.comProblem.detail",{
            url:"/detail/:id",
            templateUrl:"knowledge/views/comProblem/view.html",
            controller:"comProblemViewController"
        })
        //****************************常见问题管理模块******************************
    }
]);
//知识库管理->协议管理模块
angular.module('agreement.route',['ui.router'])
.config(["$stateProvider","$urlRouterProvider",function($stateProvider, $urlRouterProvider) {
    $stateProvider
        //****************************协议管理模块******************************
        .state('index.agreement',{
            url:'/agreement',
            abstract:true,
            templateUrl:'knowledge/views/agreement/agreement.html',
            controller:'agreementController',
            resolve:{
                deps:['$ocLazyLoad',function($ocLazyLoad){
                    return $ocLazyLoad.load('knowledge.agreementController');
                }]
            }
        })
        //协议列表
        .state('index.agreement.list',{
            url:'',
            templateUrl:'knowledge/views/agreement/list.html',
            controller:'agreementListController'
        })
        //添加协议
        .state("index.agreement.add",{
            url:"/add",
            templateUrl:"knowledge/views/agreement/add.html",
            controller:"agreementAddController"
        })
        //修改协议
        .state("index.agreement.update",{
            url:"/update/:id",
            templateUrl:"knowledge/views/agreement/edit.html",
            controller:"agreementEditController"
        })
        //协议详细
        .state("index.agreement.detail",{
            url:"/detail/:id",
            templateUrl:"knowledge/views/agreement/view.html",
            controller:"agreementViewController"
        })
        //****************************协议管理模块******************************
    }
]);
//知识库管理->考卷管理模块
angular.module('examPaper.route',['ui.router'])
.config(["$stateProvider","$urlRouterProvider",function($stateProvider, $urlRouterProvider) {
    $stateProvider
        //****************************协议管理模块******************************
        .state('index.examPaper',{
            url:'/examPaper',
            abstract:true,
            templateUrl:'knowledge/views/examPaper/examPaper.html',
            controller:'examPaperController',
            resolve:{
                deps:['$ocLazyLoad',function($ocLazyLoad){
                    return $ocLazyLoad.load('knowledge.examPaperController');
                }]
            }
        })
        //考卷列表
        .state('index.examPaper.list',{
            url:'',
            templateUrl:'knowledge/views/examPaper/list.html',
            controller:'examPaperListController'
        })
        //添加考卷
        .state("index.examPaper.add",{
            url:"/add",
            templateUrl:"knowledge/views/examPaper/add.html",
            controller:"examPaperAddController"
        })
        //修改考卷
        /*.state("index.examPaper.update",{
            url:"/update/:id",
            templateUrl:"knowledge/views/examPaper/edit.html",
            controller:"examPaperEditController"
        })*/
        //考卷详细
        .state("index.examPaper.detail",{
            url:"/detail/:id",
            templateUrl:"knowledge/views/examPaper/view.html",
            controller:"examPaperViewController"
        })
        //****************************考卷管理模块******************************
    }
]);