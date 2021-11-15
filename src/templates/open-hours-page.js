import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import Layout from '../components/Layout'
import Content, { HTMLContent } from '../components/Content'

export const OpenHoursPageTemplate = ({ title, image, content, contentComponent }) => {
  const PageContent = contentComponent || Content

  return (
    <section className="section section--gradient">
      <div className="container">
        <div className="columns">
          <div className="column is-10 is-offset-1">
            <div className="section">
              <h2 className="title is-size-3 has-text-weight-bold is-bold-light">
                {title}
              </h2>
              <div
                className="full-width-image-container about-staff margin-top-0"
                style={{
                  backgroundImage: `url(${
                    !!image.childImageSharp ? image.childImageSharp.fluid.src : image
                  })`,
                  border: '5px solid rgb(162, 178, 159)'
                }}
              >
              </div>
              <PageContent className="content" content={content} />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

OpenHoursPageTemplate.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.string,
  contentComponent: PropTypes.func,
}

const OpenHoursPage = ({ data }) => {
  const { markdownRemark: post } = data

  return (
    <Layout>
      <OpenHoursPageTemplate
        contentComponent={HTMLContent}
        title={post.frontmatter.title}
        image={post.frontmatter.image}
        content={post.html}
      />
    </Layout>
  )
}

OpenHoursPage.propTypes = {
  data: PropTypes.object.isRequired,
}

export default OpenHoursPage

export const openHoursPageQuery = graphql`
  query OpenHoursUsPage($id: String!) {
    markdownRemark(id: { eq: $id }) {
      html
      frontmatter {
        title
        image {
          childImageSharp {
            fluid(maxWidth: 2200, quality: 100) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    }
  }
`
