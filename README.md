# Project Folder Structure

```
.eslintrc.js
.prettierrc
gfs.js
nest-cli.json
package-lock.json
package.json
README.md
src/
   app.controller.spec.ts
   app.controller.ts
   app.module.ts
   app.service.ts
   auth/
      auth.controller.spec.ts
      auth.controller.ts
      auth.guard.ts
      auth.module.ts
      auth.service.spec.ts
      auth.service.ts
      constants.ts
   books/
      book.controller.spec.ts
      book.controller.ts
      book.module.ts
      book.service.spec.ts
      book.service.ts
      dto/
         create-book.dto.ts
         update-book.dto.ts
      interfaces/
         book.interface.ts
      schemas/
         book.schema.ts
   common/
      constants/
         app.constants.ts
      dto/
         pagination.dto.ts
      helpers/
         utility.helpers.ts
         utility.logger.ts
      services/
         email.service.ts
   filters/
      all-exceptions.filter.ts
   main.ts
   middleware/
      logger.middleware.ts
   operator/
      dto/
         admin-login.dto.ts
         create-operator.dto.ts
         update-operator.dto.ts
      interfaces/
         operator.interface.ts
      operator.controller.spec.ts
      operator.controller.ts
      operator.module.ts
      operator.service.spec.ts
      operator.service.ts
      schemas/
         operator.schema.ts
   users/
      dto/
         create-book.dto.ts
      interfaces/
         book.interface.ts
      schemas/
         user.schema.ts
      user.model.ts
      users.module.ts
      users.service.spec.ts
      users.service.ts
test/
   app.e2e-spec.ts
   jest-e2e.json
tsconfig.build.json
tsconfig.json

```
