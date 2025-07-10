import nodemailer from 'nodemailer';

import { EMAIL_PASSWORD } from './env.js'

export const accountEmail = 'newspace215@gmail.com'; // Replace with your email

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'newspace215@gmail.com',
    pass: EMAIL_PASSWORD
  }
})

export default transporter;