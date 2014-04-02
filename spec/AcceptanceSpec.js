"use strict"

var f = require('../factory');

describe('a factory that makes several different types of widgets', function() {
    var factory;
    var widgetId;
    beforeEach(function() {
        factory = f.Factory.create();
        var widget = {
            name: "client",
        };
        widgetId = factory.addWidget(widget);
    });
    describe('an interface to allow clients to interact with the factory', function() {
        it('should allow the clients to see the differnt types of widgets', function() {
            var widgets = factory.widgetList();
            expect(widgets.length).not.toEqual(0);
        });
        it('should allow clients to identify themselves', function() {
            var client = {
                name: "client",
                address: "1234 Main",
                city: "Springfield",
                State: "OR",
                Zip: "12345",
                Phone: "123-123-1234",
            };
            var clientId = factory.addClient(client);
            expect(clientId).toEqual("client");
        });
        describe('allow the client to requtest quotes', function() {
            var clientId;
            beforeEach(function() {
                var client = {
                    name: "client",
                    address: "1234 Main",
                    city: "Springfield",
                    State: "OR",
                    Zip: "12345",
                    Phone: "123-123-1234",
                };
                var widget = {
                    name: "client",
                };
                clientId = factory.addClient(client);
            });
            
            it('should allow the clients to request a quote on delivery of x number of widgets', function() {
                var quoteId = factory.getQuote(clientId,widgetId,new Date(),10);
                expect(quoteId).not.toEqual(0);
            });
            it('should allow the clients to check if a quote is ready', function() {
                var quoteId = factory.getQuote(clientId,widgetId,new Date(),10);
                var cost = factory.calculateQuote(quoteId, 50);
                expect(cost).toEqual(100 * 1.5);
                var approved = factory.approveQuote(quoteId);
                expect(approved).toBeTruthy();
                var isReady = factory.isQuoteReady(quoteId);
                expect(isReady).toBeTruthy();
            });
            it('should allow the clients to request fulfillment of a quote', function() {
                var quoteId = factory.getQuote(clientId,widgetId,new Date(),10);
                var cost = factory.calculateQuote(quoteId, 50);
                expect(cost).toEqual(100 * 1.5);
                var approved = factory.approveQuote(quoteId);
                expect(approved).toBeTruthy();
                var orderNumber = factory.fulfillQuote(quoteId);
                expect(orderNumber).not.toEqual(0);
            });
            
        });
    });
    describe('an interface to allow administrators to define aspects of the factory', function() {
        describe('should allow the administrators to define widgets that can be built', function() {
            var clientId;
            var widgetId;
            beforeEach(function() {
                var client = {
                    name: "client",
                    address: "1234 Main",
                    city: "Springfield",
                    State: "OR",
                    Zip: "12345",
                    Phone: "123-123-1234",
                };
                var widget = {
                    name: "client",
                };
                clientId = factory.addClient(client);
                widgetId = factory.addWidget(widget);
            });
            it('should allow the administrator to add widgets', function() {
                var widget = {
                    name: "wiget1"
                };
                factory.addWidget(widget);
                var widgets = factory.widgetList();
                expect(widgets.indexOf(widget)).not.toEqual(-1);
            });
            it('should allow the administrator to delete widgets', function() {
                var widget = {};
                factory.addWidget(widget);
                var widgets = factory.widgetList();
                expect(widgets.indexOf(widget)).not.toEqual(-1);
                factory.deleteWidget(widget);
                expect(widgets.indexOf(widget)).toEqual(-1);
            });
            it('should allow the administrator to calcluate a quote and add markup', function() {
                var quoteId = factory.getQuote(clientId,widgetId,new Date(),10);
                var cost = factory.calculateQuote(quoteId, 50);
                expect(cost).toEqual(100 * 1.5);
                var approved = factory.approveQuote(quoteId);
                expect(approved).toBeTruthy();
            });
        });
    });
});