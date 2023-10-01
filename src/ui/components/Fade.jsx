import { useTransition, animated } from '@react-spring/web'

export const Fade = ({ children, in: isVisible, ...rest }) => {
  const transitions = useTransition(isVisible, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
    config: (_, __, state) => {
      switch (state) {
        case 'enter':
          return { duration: 200 }
        case 'leave':
          return { duration: 3000 }
      }
    }
  })

  return transitions(
    (style, item) =>
      item && (
        <animated.div style={style} {...rest}>
          {children}
        </animated.div>
      )
  )
}
