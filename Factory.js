"use strict"

var Factory = {
    _nextId: 1,
    _nextOrderNumber: 1,
    _widgets: [],
    _quotes: [],
    _clients: [],
    create: function() {
        return Object.create(Factory).init();
    },
    init: function() {
        return this;
    },
    addClient: function(client) {
        this._clients.push(client);
        return client.name;
    },
    widgetList: function() {
        return this._widgets;
    },
    addWidget: function(widget) {
        this._widgets.push(widget);
        return widget.name;
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
    },
    calculateQuote: function(quoteId, markup) {
        var quote = this.findQuote(quoteId);
        if(!quote) {
            throw Error('qoute id: ' + quoteId + ' is not in the system');
        }
        quote.cost = 100 + 100*(markup/100);
        return quote.cost;
    },
    approveQuote: function(quoteId) {
        var quote = this.findQuote(quoteId);
        if(!quote) {
            throw Error('qoute id: ' + quoteId + ' is not in the system');
        }
        quote.isReady = true;
        return quote.isReady;
    }

};

module.exports.Factory = Factory;