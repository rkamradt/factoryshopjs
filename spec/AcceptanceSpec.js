"use strict"

var f = require('../factory');

describe('a factory that makes several different types of widgets', function() {
    describe('an interface to allow clients to interact with the factory', function() {
        it('should allow the clients to see the differnt types of widgets', function() {
            var factory = f.Factory.create();
            var widgets = factory.widgetList();
            expect(widgets.length).not.toEqual(0);
        });
        it('should allow the clients to request a quote on delivery of x number of widgets', function() {
            var factory = f.Factory.create();
            var quoteId = factory.getQuote({},new Date(),10);
        });
        it('should allow the clients to check if a quote is ready', function() {
            var factory = f.Factory.create();
            var quoteId = factory.getQuote({},new Date(),10);
            var isReady = factory.isQuoteReady(quoteId);
            expect(isReady).toBeTruthy();
        });
        it('should allow the clients to request fulfillment of a quote', function() {
            var factory = f.Factory.create();
            var quoteId = factory.getQuote({},new Date(),10);
            var orderNumber = factory.fulfillQuote(quoteId);
            expect(orderNumber).not.toEqual(0);
        });
        
    });
    describe('an interface to allow administrators to define aspects of the factory', function() {
        describe('should allow the administrators to define widgets that can be built', function() {
            it('should allow the administrator to add widgets', function() {
                var widget = {};
                var factory = f.Factory.create();
                factory.addWidget(widget);
                var widgets = factory.widgetList();
                expect(widgets.indexOf(widget)).not.toEqual(-1);
            });
            it('should allow the administrator to delete widgets', function() {
                var widget = {};
                var factory = f.Factory.create();
                factory.addWidget(widget);
                var widgets = factory.widgetList();
                expect(widgets.indexOf(widget)).not.toEqual(-1);
                factory.deleteWidget(widget);
                expect(widgets.indexOf(widget)).toEqual(-1);
            });
        });
    });
});