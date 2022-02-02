import React, { FunctionComponent, ReactNode } from 'react'
import _ from 'lodash'
import { Route } from '../Route'

type EmailLinkProps = {
  email: string,
  children?: ReactNode,
  [key: string]: any,
}

const EmailLink: FunctionComponent<EmailLinkProps> = (data) => {
  let {
    email,
    children,
    ...props
  } = data

  return (
    <>
      <a
        href={ Route.email(email) }
        { ...props }
      >
        { !_.isEmpty(children) ? children : email }
      </a>
    </>
  )
}

export default EmailLink
