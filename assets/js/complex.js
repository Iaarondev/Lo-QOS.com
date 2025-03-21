// assets/js/complex.js
export class Complex {
    constructor(real, imag = 0) {
        this.real = real;
        this.imag = imag;
    }

    add(other) {
        return new Complex(this.real + other.real, this.imag + other.imag);
    }

    multiply(other) {
        return new Complex(
            this.real * other.real - this.imag * other.imag,
            this.real * other.imag + this.imag * other.real
        );
    }

    magnitude() {
        return Math.sqrt(this.real ** 2 + this.imag ** 2);
    }

    toString() {
        return `${this.real}${this.imag >= 0 ? '+' : ''}${this.imag}i`;
    }
}
