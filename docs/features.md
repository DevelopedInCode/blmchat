# Features

[README Page](../README.md)

## User Accounts

- [ ] User registration 
    - Require email validation
    - Methods:
        - Discord
        - Google
        - Steam
- [ ] Friend List
    - Requests (Approve/Deny)
    - Block List
        - Blurs chat in rooms
        - Prevents private messaging with user
        - Does not show any user info or customization
- [ ] Security Settings
    - Who can message (friends only, has mutuals, or public)
    - Require mutual chat room for new messages
    - Auto responses
        - Sends set message when someone starts a new message with you
        - Set different responses for each chat room, friends, or random people reaching out
    - Who can send you PM links (friends, mutual, public. can allow specific people)
    - Who can send PM images/documents (see above note)

## Chat Rooms
- [ ] User created chat rooms
    - Room Settings:
        - Who Can Join
            - Public (default)
            - Request to Join
            - Private (subscription)
        - Room Information
            - Name
            - Description
            - Room Picture
        - Roles:
            - Owner (default, can't edit)
            - Custom roles / permissions
                - Can invite
                - Can approve join requests
                - Post images
                - Post links
                - Can Chat
        - Sub-Topics
            - Accessed via side menu and separate from main chat
            - Define what groups have access / Specific permissions
- [ ] Homepage shows top public chat rooms
    - Determine by votes on public view page (by recent, show recent and all time)
        - Use MySQL scheduler to tally total votes periodically
