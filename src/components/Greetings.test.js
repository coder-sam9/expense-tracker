    import { render ,screen} from "@testing-library/react"
    import Greetings from "./Greetings"
    import "@testing-library/jest-dom";


    test('Testsing the greeting',()=>{
        render(<Greetings/>)
        const h1 = screen.getByText('Hello, World!')
        expect(h1).toBeInTheDocument()
    })