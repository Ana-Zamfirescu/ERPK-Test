module.exports = function(app) {
  return new Handler(app);
};

var Handler = function(app) {
  this.app = app;
};

/**
 * New client entry.
 *
 * @param  {Object}   msg     request message
 * @param  {Object}   session current session object
 * @param  {Function} next    next step callback
 * @return {Void}
 */
Handler.prototype.entry = function(msg, session, next) {
  next(null, {code: 200, msg: 'nailed it!'});
};

/**
 * Get longest 0 sequence.
 *
 * @param  {Object}   msg     request message
 * @param  {Object}   session current session object
 * @param  {Function} next    next step callback
 * @return {Void}
 */
 Handler.prototype.sequence = function(msg, session, next) {
	let param = msg.param,
		toBinary = param.toString(2);
		const reducer = (acc, value) => {
			acc.count = acc.last === value
			  ? acc.count + 1
			  : 1;
			acc.last = value;
			acc.result = acc.count > acc.result.count
			  ? { count: acc.count, char: value }
			  : acc.result;
			return acc;
		  }
		  const initAcc = {
			result: {
			  char: '',
			  count: 0
			}
		  }
		  const { result } = toBinary.split('').reduce(reducer, initAcc);
	
	next(null, {code: 200, msg: result.count});
  };

/**
 * Publish route for mqtt connector.
 *
 * @param  {Object}   msg     request message
 * @param  {Object}   session current session object
 * @param  {Function} next    next step callback
 * @return {Void}
 */
Handler.prototype.publish = function(msg, session, next) {
	var result = {
		topic: 'publish',
		payload: JSON.stringify({code: 200, msg: 'publish message is ok.'})
	};
  next(null, result);
};

/**
 * Subscribe route for mqtt connector.
 *
 * @param  {Object}   msg     request message
 * @param  {Object}   session current session object
 * @param  {Function} next    next step callback
 * @return {Void}
 */
Handler.prototype.subscribe = function(msg, session, next) {
	var result = {
		topic: 'subscribe',
		payload: JSON.stringify({code: 200, msg: 'subscribe message is ok.'})
	};
  next(null, result);
};
