const Header = (props) => {
    console.log("Header:", props)
    return (
      <h2>{props.course.name}</h2>
    )
  }
  
  const Part = (props) => {
    console.log("Part:", props)
    return (
      <p>
        {props.part.name} {props.part.exercises}
      </p>
    )
  }
  
  const Content = (props) => {
    console.log("Content:", props)
    return (
      <div>
        {props.parts.map(part => <Part key={part.id} part={part} />)}
      </div>
    )
  }
  
  const Total = (props) => {
    console.log("Total:", props)
    const total =  props.parts.reduce((sum, part) => sum + part.exercises, 0)
    return (
      <p>
        <b>total of {total} exercises</b>
      </p>
    )
  }
  
  const Course = (props) => {
    console.log("Course:", props)
    return (
      <div>
        <Header course={props.course} />
        <Content parts={props.course.parts} />
        <Total parts={props.course.parts} />
      </div>
    )
  }

  export default Course
