
## **Iterative Development & User Interaction**

The AI's workflow is iterative, transparent, and responsive to user input.

*   **Plan Generation & Blueprint Management:** Each time the user requests a change, the AI will first generate a clear plan overview and a list of actionable steps. This plan will then be used to **create or update a `blueprint.md` file** in the project's root directory.
    *   The blueprint.md file will serve as a single source of truth, containing:
        *   A section with a concise overview of the purpose and capabilities.
        *   A section with a detailed outline documenting the project, including *all style, design, and features* implemented in the application from the initial version to the current version.
        *   A section with a detailed outline of the plan and steps for the current requested change.
    *   Before initiating any new change or at the start of a new chat session, the AI will reference the blueprint.md to ensure full context and understanding of the application's current state and existing features. This ensures consistency and avoids redundant or conflicting modifications.
*   **Prompt Understanding:** The AI will interpret user prompts to understand the desired changes. It will ask clarifying questions if the prompt is ambiguous.
*   **Contextual Responses:** The AI will provide conversational responses, explaining its actions, progress, and any issues encountered.
*   **Error Checking Flow:**
    1.  **Important:** The AI will **not** start the dev server (`next dev`), as it is already managed by Firebase Studio.
    2.  **Code Change:** AI applies a code modification.
    3.  **Dependency Check:** If a new package is needed, AI runs `npm install`.
    4.  **Compile & Analyze:** AI runs `npm run lint` and monitors the dev server.
    5.  **Preview Check:** AI observes the browser preview for visual and runtime errors.
    6.  **Remediation/Report:** If errors are found, AI attempts automatic fixes. If unsuccessful, it reports details to the user.

## **Deployment**

This project is configured for deployment to Firebase App Hosting.

To deploy the application, run the following command:

```bash
firebase deploy --project jtzwu-myvpcsc-test
```

### **Secrets Management**

Secrets, such as API keys or database credentials, must be managed securely using Google Cloud Secret Manager and exposed to your application via Firebase App Hosting configuration.

1.  **Define the Secret in `apphosting.yaml`:**
    Reference the secret in the `env` section of your `apphosting.yaml` file. This tells App Hosting to expose the secret's value as an environment variable to your application at runtime.

    ```yaml
    # apphosting.yaml
    run: npm run start
    env:
      - variable: MY_SECRET_VAR
        secret: MY_SECRET_NAME_IN_SECRET_MANAGER
    ```

2.  **Create and Set the Secret in Secret Manager:**
    If you haven't already, create the secret and set its value in Google Cloud Secret Manager. You can do this via the Google Cloud Console or the `gcloud` CLI. The `MY_SECRET_NAME_IN_SECRET_MANAGER` from the step above must match the name you give the secret here.

3.  **Grant Access to the Backend:**
    You must explicitly grant your App Hosting backend's service account permission to access the secret. Use the `firebase apphosting:secrets:grantaccess` command.

    *   `SECRET_NAME`: The name of the secret in Secret Manager.
    *   `BACKEND_ID`: The ID of your backend (e.g., `audio-ui`).
    *   `PROJECT_ID`: Your Firebase project ID.

    ```bash
    firebase apphosting:secrets:grantaccess SECRET_NAME --backend=BACKEND_ID --project=PROJECT_ID
    ```

    This command correctly configures the IAM policy for the backend's service account, allowing it to access the specified secret. This is a critical step for deployments to succeed.
