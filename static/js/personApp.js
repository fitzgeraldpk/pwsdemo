/*
 * Angular App used primarily for the Accomdation table
 */
var personApp = angular.module('person-app',[]);



personApp.controller('personAppCtrl',['$scope','$filter','databaseService','$timeout',function($scope,$filter,databaseService,$timeout) {
        
    function init(){
        $scope.currentPage = 1;
        $scope.numPerPage = 7;
        //Accommodation List
        $scope.people=[];
        //Filter
        $scope.accomFilteredList=[];
        $scope.searchList='';
        //clear Grid
        $scope.clearListGrid =false;
        $scope.peoplePerPage=10;
        $scope.btnSave='Save';
        $scope.getAllPeople(1,500);
    }
        
        var navigationFn = {
            goToSection: function(id) {
                $('html, body').animate({
                    scrollTop: $(id).offset().top
                }, 0);
            }
        }
        
        
        $scope.addNew = function(person){
            var data={};
            data.person=person;
            if (typeof $scope.currentPerson!='undefined' && typeof $scope.currentPerson.id!='undefined'&& $scope.btnSave==='Update'){
                console.log('$scope.currentPerson.id: '+$scope.currentPerson.id)
                data.person.id=$scope.currentPerson.id;
            }
            var promise;
                promise=databaseService.save(data);
                promise.then(function(){
                    console.log('person added');
                    $scope.btnSave='Save';
                    $scope.getAllPeople(1,500);
                },function (message) {
                        //$scope.showError();
                        $scope.errorMsg = message;
                        //$scope.accessed = 'Error';
                    }
                );             
            console.log(data);            
        }

        $scope.getPerson = function(id){
            var promise;
                promise=databaseService.getPerson(id);
                promise.then(function(data){
                     $scope.currentPerson=data.person.data;
                      console.log('id: '+id);
                      $scope.currentPerson.id=id;
                      console.log($scope.currentPerson.id);
                      $scope.person.firstname=$scope.currentPerson.firstname;
                      $scope.person.lastname=$scope.currentPerson.lastname;
                      $scope.person.age=$scope.currentPerson.age;
                      $scope.person.address={"intial":""};
                      $scope.person.address.line1=$scope.currentPerson.addressline1;
                      $scope.person.address.line2=$scope.currentPerson.addressline2;
                      $scope.person.address.town=$scope.currentPerson.addresstown;
                      $scope.person.address.county=$scope.currentPerson.addresscounty;
                      $scope.person.address.country=$scope.currentPerson.addressCountry;
                      $scope.btnSave='Update';
                      navigationFn.goToSection('#form');
                },function (message) {
                        //$scope.showError();
                        $scope.errorMsg = message;
                        //$scope.accessed = 'Error';
                    }
                );          
        }

        function updatePeopleList (){
            var count=0;
             $timeout(function() {
                $scope.people={};
              for (var x=0;x<$scope.peopleList.data.length;x++){
                                if ($scope.peopleList.data[x]!=null){
                                    count=count+1;
                                    $scope.people[count]=$scope.peopleList.data[x];
                                }
                            }
                             $scope.totalPeople=count;
            }, 0);
            
        }    

        $scope.getAllPeople = function(start,finish){
            var promise;
                promise = databaseService.getPeople(start,finish);
                promise.then(function (data) {
                        if (data !== null) {
                            $scope.peopleList = data.data;              
                            updatePeopleList();
                        }
                        else {
                            //$scope.showError();
                            $scope.errorMsg = data.errorMsg;
                        }
                    }, function (message) {
                        //$scope.showError();
                        $scope.errorMsg = message;
                        //$scope.accessed = 'Error';
                    }
                );
        }
        
        
       $scope.deletePerson = function(id){
            var promise;
                promise= databaseService.deletePerson(id);
                promise.then(function(){
                    console.log('person deleted');
                    $scope.peopleList={};
                    $scope.getAllPeople(1,50);
                },function(message){
                    $scope.errorMsg = message;
                } );     

               
        }



    $scope.master = {};

  $scope.update = function(person) {
    $scope.master = angular.copy(user);
  };

  $scope.reset = function(form) {
    if (form) {
      form.$setPristine();
      form.$setUntouched();
    }
    $scope.person = angular.copy($scope.master);
    $scope.btnSave='Save';
  };

  $scope.reset();

  init();
        
        
}]);     



   //retrieve facebook photos not currently being used
       personApp.service('databaseService', function($http) {
   return {
        save: function(person) {
             //return the promise directly.
             return $http.post('http://person-appjs.cfapps.io/person',person)
                       .then(function(result) {
                            //resolve the promise as the data
                            console.log(result);
                        });
        },
         getPerson: function(id) {
             //return the promise directly.
             return $http.get('http://person-appjs.cfapps.io/person/'+id)
                       .then(function(result) {
                            //resolve the promise as the data
                            var data={};
                            data.person=result;
                            return data;
                        });
        },
         getPeople: function(start,finish) {
             //return the promise directly.
             return $http.get('http://person-appjs.cfapps.io/people/'+start+'/'+finish)
                       .then(function(result) {
                            //resolve the promise as the data
                            return result;
                        });
        },
        deletePerson: function(id){
            return $http.delete('http://person-appjs.cfapps.io/person/'+id)
                       .then(function(result) {
                            //resolve the promise as the data
                            
                            console.log(result);
                        });
        }
        
   }
});






