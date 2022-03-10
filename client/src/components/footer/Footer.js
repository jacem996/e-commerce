import React from 'react'
import Footer from './index'
import Icon from './indexIcon'


export function FooterContainer() {
  return (
      <Footer>
          <Footer.Wrapper>
          <Footer.Row>
              <Footer.Column>
              <Footer.Title>About Us</Footer.Title>
                  <Footer.Link href="#">Story</Footer.Link>
                  <Footer.Link href="#">Clients</Footer.Link>
                  <Footer.Link href="#">Testimonials</Footer.Link>
              </Footer.Column>
              <Footer.Column>
              <Footer.Title>Services</Footer.Title>
                  <Footer.Link href="#">sale of surveillance equipment</Footer.Link>
                  <Footer.Link href="#">Installation</Footer.Link>
                  <Footer.Link href="#">Development</Footer.Link>
                  <Footer.Link href="#">Design</Footer.Link>
              </Footer.Column>
              <Footer.Column>
              <Footer.Title>The websites of Tunipages</Footer.Title>
                  <Footer.Link href="https://www.tunipages.tn/">tunipages.com</Footer.Link>
                  <Footer.Link href="https://www.appeloffres.net/">appeloffres.net</Footer.Link>
                  <Footer.Link href="https://www.maghreb-prospection.net/">prospection.net</Footer.Link>
                  <Footer.Link href="https://www.appeloffres.net/">annuairepro.com</Footer.Link>
              </Footer.Column>
              <Footer.Column>
              <Footer.Title>Social</Footer.Title>
                  <Footer.Link href="#"><Icon className="fab fa-facebook-f" />Facebook</Footer.Link>
                  <Footer.Link href="#"><Icon className="fab fa-instagram" />Instagram</Footer.Link>
                  <Footer.Link href="#"><Icon className="fab fa-youtube" />Youtube</Footer.Link>
                  <Footer.Link href="#"><Icon className="fab fa-twitter" />Twitter</Footer.Link>
              </Footer.Column>
          </Footer.Row>
          <hr />
        <div className="row" style={{margin:'30px 0'}}>
          <p className="col-sm" style={{color:'#fff'}}>
            &copy;{new Date().getFullYear()} | All rights reserved |
            Terms Of Service | Privacy
          </p>
        </div>
          </Footer.Wrapper>
      </Footer>
  )
}