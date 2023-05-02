
# Problem Statement
The current iteration of our project faces several problems:

1. Difficult to find and squash bugs, reducing reliability for users.

2. Virtually non-existent code coverage (almost no unit / integration tests), which contributes to problem #1.

3. The codebase contains widespread code duplication, again contributing to #1, but also contributing to #4.

4. The behavior of the application will be hard to extend or modify, due to #3 but also due to tight coupling present in many places in the code.

	a. Extensibility and flexibility will be important as we try to improve user experience and increase data security

5. There is no uniform approach to working with the codebase. This means that code duplication happens easily and often.

6. Some legacy/deprecated approaches are preserved in the codebase.

	a. Examples include the use of node-sass, @import keyword within scss files, and even the use of Create React App itself (which is not officially deprecated, but is not mentioned in the production-grade frameworks section of React.dev)

7. Performance, as measured by Lighthouse, is quite slow, again negatively impacting user experience.

  

Additionally, the framework we are currently using to bootstrap our React app, Create React App, faces several inherent issues of its own:

  

1. It is no longer mentioned as a suggested production-grade framework on [React.dev](https://react.dev/learn/start-a-new-react-project#production-grade-react-frameworks)

2. It is slow, both for users and developers.

3. It offers fewer out-of-the-box conveniences than other frameworks.

4. It is limited in terms of configurability, preventing the use of certain libraries such as Inversify.

  
  

# Proposed Solution

  

This branch exists to realize a proposed solution to the above problems. The proposed solution is as follows:

  

1. Migrate to Next.js. This will solve all of the issues with CRA:

	a. Next.js is the first framework recommended by the React team on their page. It is modern, well-supported, and innovative.

	b. Next.js is fast. Automatic code-splitting means that only the JavaScript necessary to render a page is initially loaded, but JavaScript for Linked pages (or pages navigated to via the useRouter hook) can be prefetched in the background, leading to a lightning-fast user experience. Additionally, static generation can be used to generate html for pages that are static in nature, even if they require data to be fetched in order to render them! An example of this could be our Partners page. The Next.js compiler (written in Rust using SWC) is 17x faster than Babel. See [this](https://nextjs.org/docs/advanced-features/compiler).

	c. Next.js offers a ton of well thought out and extremely useful utilities which are baked right into the framework. Besides the Link component, which takes care of prefetching javascript in the background, and the useRouter hook which can also be instructed to do so, Next allows you to customize metadata in the head of each page, includes an Image component which handles lazy loading and image optimization, and much more.

	d. Next.js is highly configurable, and is easily configured to work with Inversify.

	e. Next.js will positively impact user experience, performance, and developer experience.

	f. Next.js is a full-stack framework, with the ability to add API routes which are not added to the frontend bundle. This means that we can begin thinking about implementing features such as encryption of user data in a way that will be secure, and we can extend and modify the behavior of our application more easily in the future.

  

2. Adopt Test Driven Development and Automate Tests

	a. Because we will be migrating the codebase to a new framework, we can take this opportunity to improve our development practices. We should aim to write tests as we write our functions, methods, and components.

	b. By automating tests using GitHub actions, we can set up guards that ensure that all tests must pass before code is merged into this branch.

	c. We should aim to achieve 100% code coverage.

	d. By taking these steps, we will:

	- Create clear descriptions of what each element of the codebase is supposed to do. As the application changes, tests are quicker to change than documentation or comments. Thus, they create, in a sense, the most reliable documentation possible

	- Better account for edge cases. By writing tests, developers will be challenged to better account for edge cases

	- Reduce bugs

	- Improve the maintainability of the codebase and prevent it from rotting

	- Increase our confidence in our ability to change the behavior of the code without breaking it

	e. See [this summary](https://medium.com/@shley_ng/clean-code-unit-tests-c0c871219f75) of the unit tests chapter of Robert C. Martin ("Uncle Bob")'s book, Clean Code

  

3. Adopt SOLID Design Principles / Leverage Inversion of Control (IoC)

	a. SOLID Design principles and Inversion of Control are powerful concepts that will allow us to create more loosely-coupled code, which in turn will:

	- Increase extensibility of the application. Want to change the mechanism for registering to vote? No problem, simply create a new class that implements the voter registration service interface, and indicate to the IoC container that it should supply dependent components with this class. The components that depend on this interface will not have to change AT ALL.

	- Increase the testability of our application. Since service classes will not be hard-coded into dependent classes, these can be easily swapped out for mocks / stubs as needed.

	- Improve encapsulation, which will improve DRY-ness and again, create a more loosely-coupled codebase. Related methods and variables should be encapsulated together in classes

	b. This will be accomplished with Inversify

	c. For more information on SOLID, see [this](https://www.baeldung.com/solid-principles)

	d. For more information on IoC, specifically via the Dependency Injection pattern, see [this](https://medium.com/@amitkma/understanding-inversion-of-control-ioc-principle-163b1dc97454)

  

4. Adopt TypeScript

	a. In order for IoC to function properly, we need to adopt a strongly-typed language. This is because we need to use metadata to determine the types of the interfaces upon which service classes depend, so that the IoC container can inject or autowire them with the service that implements that interface. For more information on metadata in typescript, see [this](https://www.typescriptlang.org/docs/handbook/decorators.html#metadata)

	b. TypeScript will have an important benefit of its own, though! By clearly defining the types of data that our methods, constructors, functions, etc expect to receive and return, we can make it easier for developers to collaborate with each others' code!

  

5. Create an opinionated coding style guide to help our distributed team work in a more uniform way, and have an ongoing dialog about what this should look like.

	a. By creating an opinionated guide on how to interact with the codebase as a developer, we will help eliminate code duplication, create a better-structured application that adheres to consistent design patterns, and ensure that all code is being properly tested

	b. This will also make it easier for new developers to join

	c. This should be an ongoing dialog. As we each learn more, and as the application evolves, we should feel free to come to new conclusions about the best approach for structuring, building, maintaining and extending our application

  

6. Clean as you go

	a. Finally, we should each clean as we go. If, in every commit, a developer eliminates redundancy, names a variable more clearly, replaces a div or two with a more semantically meaningful html element, tests a previously untested element, the codebase will gradually get cleaner and cleaner

# SCSS and the Styles Directory

## Folder Structure

As an initial attempt at practicing clean-as-you-go, the styles directory was refactored to reduce redundancy, and improve consistency of naming. The directory has been slimmed down from 554 lines of code to 330 (not including modules, which are component- and page-specific stylesheets).

The new folder directory looks like this:

    styles
    │   ├───defaults
    │   ├───modules
    │   │   ├───components
    │   │   └───pages
    │   └───partials
    │       ├───classes
    │       │   ├───molecules
    │       │   └───utils
    │       ├───mixins
    │       └───variables

Defaults contains application-wide defaults, such as default text color, background-color, box-sizing, etc.

Modules contain scss modules for page- and component-scoped styles.

Partials contains classes, mixins and variables which are globally available throughout the application, and which can be imported into a module using `@use '../../partials';`
Note that there should be no need to add any other @use statements within a module--everything you will need should be in partials.

Within partials, classes are classified as molecules--complex classes that are reused frequently throughout the application--and utils, which are classes which basically do one thing and one thing only and can be combined to get a desired outcome.

This folder structure was created with the atomic css pattern in mind, but with room for flexibility as many pages have highly page-specific styles associated with them.

## Workflow

In general, when working with the stylesheets, as with the rest of the codebase, we want to keep them as DRY as possible. Therefore, this workflow is recommended:

1. Are your styles provided in defaults? If so, there may be no need to add classes at all.
2. Are your styles provided by a class or classes in molecules? For example, a button with a gradient? If so, use this class or combine the necessary classes from molecules.
3. Can your styles be achieved by a single utility class or a combination of utility classes? If so, use this class or a  combination of utility classes to get the desired result. Molecules and utility classes can be combined if necessary, of course.
4. Are the values needed to apply your styles defined in variables? If so, use these variables.
5. If you could not find the values you need for your styles, you can either:
	- Create an scss module for your page or component. This will create locally-scoped classes which will not collide with any other classes in the application. This is generally probably the approach you will take, especially for highly page/component-specific styles.
	- Add the values to the partials directory in the correct folder. This is the approach to take if the values you need will be used by other components or pages within the application.

## Naming Conventions

snake_case was used to name scss classes, and I would like to propose that we adopt this as our standard. Snake case allows classes defined in scss modules to be accessed without brackets, for example:

    <div className={styles.my_super_cool_class}></div>
With hyphens, brackets would need to be used:

    <div className={styles['my-super-cool-class']}></div>
With camelCase, small utility classes, such as classes for margins and padding, could look awkward:

    <div className="mtSm pXl"></div>
These look a bit clearer in snake_case:

    <div className="mt_sm p_xl"></div>

(Note that these spacing utils have not been defined yet, as padding and margins often seem in practice to be highly variable, but we may want to have a look at standardizing these better (and so follow the Figma design guide more faithfully), at which point creating utility  classes such as these could be a really nice quality-of-life feature to add).


# Tests and Automation

Simple tests have been written for the PageContainer component and the Home page. The following naming conventions have been used:

my-component.snapshot.tsx = a test that creates and checks the rendered component against a snapshot.

my-component.spec.tsx = a test that describes a tsx component.

Jest has been configured to collect coverage from src/pages and src/components (ignoring the _app component provided by Next). The test suite will fail if 100% code coverage is not achieved, or if some tests do not pass. The workflow files in the .github folder have been configured to test the code when it is pushed to the next-js-migration branch. The branch itself will be protected on github and will prevent pushing/merging this code into the next-js-migration branch until full code coverage is achieved and all tests pass.
