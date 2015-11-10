module.exports =  {
	units: [],
	dateUnitsCount:0,
	separator: null,

	get: function(format) {

		try {
			var dateAndTime = format.split(" ");

			var date = dateAndTime[0];
			var time = dateAndTime.length>1?dateAndTime[1]:false;

			var regex = new RegExp("[-\.\/]");
			var separator = date.match(regex);

			this.separator = separator?separator[0]:'-';

			var dateUnits = date.split(regex);
			this.dateUnitsCount = dateUnits.length;
			var timeUnits = time?time.split(":"):[];
			dateUnits.push.apply(dateUnits, timeUnits);

			this._pushUnits(dateUnits);

			return this._formatter();

		} catch (err) {

			if (format) console.warn(err);

			return function(date) {
				return date.toLocaleDateString();
			}

		}
	},

	_formatter: function() {

		return function(date) {
			var formattedDate = '';
			var separator;
			this.units.forEach(function(unit,index) {
				separator = this._getSeparator(index+1);
				formattedDate+= unit(date) + separator;
			}.bind(this));

			return formattedDate.slice(0,-1);
		}.bind(this);

	},

	_getSeparator: function(index) {
		switch (true)  {
			case (index<this.dateUnitsCount):
			return this.separator;
			case (index==this.dateUnitsCount):
			return " ";
			case (index>this.dateUnitsCount):
			return ":";
		}
	},

	_pushUnits: function(units) {
		units.every(function(unit, index) {
			unit = this._getUnitFunction(unit);
			if (!unit) {
				return false;
			}

			this.units.push(unit);
			return true;
		}.bind(this));

		return this.units.length;
	},

	_getUnitFunction:require('./get-unit-function')
}
