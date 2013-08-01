/**
 * Created with IntelliJ IDEA.
 * User: Anton
 * Date: 30.07.13
 * Time: 16:05
 * To change this template use File | Settings | File Templates.
 */
define(function(){
    function calculateHours(startDate, endDate){
        var hours = 0;
        if(!startDate || !endDate){
            throw new Error("CalculateTaskHours: Start or end date is undefined");
        }
        if(startDate > endDate){
            throw new Error("CalculateTaskHours: Start date can not be greater that end date");
        }
        try {
            var delta = new Date(endDate) - new Date(startDate);
            hours = Math.floor(((delta/1000)/60)/60);
        } catch(error){
            alert(error.message);
        }
        return hours;
    };
    return {
        calculateHours:calculateHours,
        convertTasks:  function (data){
            var tasks = [];
            data.forEach(function(project){
                if(project.task.tasks.length > 0){
                    project.task.tasks.forEach(function(task){
                        tasks.push({
                            'summary':task.summary,
                            'projectname':project.projectname  || 'Unknown project',
                            'assignedto':task.assignedto.uname || 'Unknown name',
                            'stage':'Unknown Stage',
                            'StartDate': new Date(task.extrainfo.StartDate).format("dd/mm/yy hh:mm:ss"),
                            'EndDate': new Date(task.extrainfo.EndDate).format("dd/mm/yy hh:mm:ss"),
                            'progress':'Unknown progress'
                        });
                    });
                }

            });
            return tasks;
        },
        convertProjects:  function (data){
            var projects = [];
            data.forEach(function(project){
                projects.push({
                    'projectname':project.projectname,
                    'projectmanager':project.projectmanager.uname || 'No name',
                    'customer':project.customer || 'Unknown',
                    'StartDate':project.info.StartDate,
                    'EndDate':project.info.EndDate,
                    'plannedtime':  calculateHours(project.info.StartDate, project.info.EndDate),
                    'timespent':  calculateHours(project.info.StartDate, new Date()),
                    'progress': '%',
                    'status': 'In Progress',
                    'taskCount': project.task.tasks.length
                });
            });
            return projects;
        }

    }
});