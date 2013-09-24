define(function (require) {
    var $ = require('jquery'),
        _ = require('underscore'),
        Backbone = require('backbone'),
        Template = _.template(require('text!./default.htm'));;


    var Project = Backbone.Model.extend({

        defaults: function () {
            return {
                id: null,
                name: "New project"
            };
        },

        initialize: function () {
            if (!this.get("name")) {
                this.set({ "name": this.defaults().name });
            }
        },

        clear: function () {
            this.destroy();
        }
    });
    
    var ProjectView = Backbone.View.extend({
        tagName: "li",
        template: _.template($('#project-template').html()),

        render: function () {
            this.$el.html(this.template(this.model.toJSON()));
            return this;
        }
    });

    var ProjectList = Backbone.Collection.extend({
        model: Project,
        url: function () {
            return 'api/projects';
        },

        done: function () {
            return this.filter(function (project) { return project.get('id'); });
        },
        comparator: function (todo) {
            return todo.get('id');
        },
        clear: function () {
            this.model.clear();
        }
    });

    var DefaultView = Backbone.View.extend({
        id: 'defaultView',
        initialize: function () {
            Projects.on('add', this.addOne, this);
            Projects.on('reset', this.addAll, this);
            Projects.on('all', this.render, this);
            
            Projects.fetch();
        },
        
        el: $("#projects"),

        render: function () {
            //this.$el.empty();
            

            return this.$el;
        },
        
        addOne: function (project) {
            var view = new ProjectView({ model: project });
            this.$("#project-list").append(view.render().el);
        },

        addAll: function () {
            Projects.each(this.addOne);
        },

    });

    var Projects = new ProjectList;

    return DefaultView;
})