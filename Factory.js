"use strict"

var Factory = {
    _nextId: 1,
    _nextOrderNumber: 1,
    _widgets: ['widget1', 'widget2'],
    _quotes: [{}, {}],
    create: function() {
        return Object.create(Factory).init();
    },
    init: function() {
        return this;
    },
    widgetList: function() {
        return this._widgets;
    },
    addWidget: function(widget) {
        this._widgets.push(widget);
    },
    deleteWidget: function(widget) {
        var ix = this._widgets.indexOf(widget);
        if(ix !== -1) {
            this._widgets.splice(ix, 1);
        }
    },
    getQuote: function(widget, date, amount) {
        var newQuote = { id: this._nextId++, what: widget, when: date, qty: amount,
                        isReady: true};
        this._quotes.push(newQuote);
        return newQuote.id;
    },
    isQuoteReady: function(quoteId) {
        var quote = this.findQuote(quoteId);
        if(!quote) {
            throw Error('qoute id: ' + quoteId + ' is not in the system');
        }
        return quote.isReady;
    },
    fulfillQuote: function(quoteId) {
        var quote = this.findQuote(quoteId);
        if(!quote) {
            throw Error('qoute id: ' + quoteId + ' is not in the system');
        }
        quote.orderNumber = this._nextOrderNumber++;
        return quote.orderNumber;
    },
    findQuote: function(quoteId) {
        var result;
        this._quotes.forEach(function(q) {
            if(q.id === quoteId) {
                result = q;
            }
        });
        return result;
    }
};

module.exports.Factory = Factory;