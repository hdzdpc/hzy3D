export class  Color {
    private _r = 0; 
    private _g = 0; 
    private _b = 0; 
    private _a = 0; 
    private _hex = 0;
    __styleString = "rgba(0, 0, 0, 1)";


    constructor(hex: number) {
        this.setHex( hex );
    }
	setHex ( hex: number ) {

		this._hex = hex;
		this.updateRGBA();
		this.updateStyleString();

	};

	setRGBA ( r: number, g: number, b: number, a: number ) {

		this._r = r;
		this._g = g;
		this._b = b;
		this._a = a;

		this.updateHex();
		this.updateStyleString();

	};

	updateHex () {

		this._hex = Math.floor( this._a * 255 ) << 24 | this._r << 16 | this._g << 8 | this._b;

	};

	updateRGBA () {

		this._r = this._hex >> 16 & 0xff;
		this._g = this._hex >> 8 & 0xff;
		this._b = this._hex & 0xff;
		this._a = (this._hex >> 24 & 0xff) / 255;

	};

	updateStyleString () {

		this.__styleString = 'rgba(' + this._r + ',' + this._g + ',' + this._b + ',' + this._a + ')';

	};

	toString () {

		return 'Color ( r: ' + this._r + ', g: ' + this._g + ', b: ' + this._b + ', a: ' + this._a + ', hex: ' + this._hex + ' )';

	};
}