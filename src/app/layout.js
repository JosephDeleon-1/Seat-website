import './globals.css'
import { Inter } from 'next/font/google'
import Header from '../components/Header'
import Footer from '../components/Footer'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
})

export const metadata = {
  title: 'Capitol Coding Institute - Medical Coding Education',
  description: 'The best place to start your medical coding career',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} font-sans`}>
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}