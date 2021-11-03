
const lodash = require("lodash");
const data = [
    {
        blockid: "d5fbcde3-48a0-4ec9-b81a-547420737495",
        deviceparentid: "c3d48133-c9b6-4c04-ba23-17acbbe0ca32",
        deviceid: "e74ad561-28b7-41c8-8a81-8fd23172dcf6",
    },

    {
        blockid: "d5fbcde3-48a0-4ec9-b81a-547420737495",
        deviceparentid: "c3d48133-c9b6-4c04-ba23-17acbbe0ca32",
        deviceid: "062cccea-11a2-4720-ab7f-9eaa45a18a10",
    },

    {
        blockid: "d5fbcde3-48a0-4ec9-b81a-547420737495",
        deviceparentid: "add570b1-4f0b-42b3-992b-7036d3ab07e8",
        deviceid: "12cd26b0-18b3-4821-93c4-8014483b2eaf",
    },

    {
        blockid: "d5fbcde3-48a0-4ec9-b81a-547420737495",
        deviceparentid: "add570b1-4f0b-42b3-992b-7036d3ab07e8",
        deviceid: "dc544959-525a-4326-9815-9e463f72eb6f",
    },

    {
        blockid: "891b629b-8c9c-4ce5-96f1-84df095d89ac",
        deviceparentid: "a39836d4-0534-42c1-b254-09ee1c1c3c3e",
        deviceid: "6093be76-c304-4da8-bbc9-024d275734a7",
    },

    {
        blockid: "891b629b-8c9c-4ce5-96f1-84df095d89ac",
        deviceparentid: "a39836d4-0534-42c1-b254-09ee1c1c3c3e",
        deviceid: "efa41359-f2d0-4b4c-872d-ff3b22dd77da",
    },

    {
        blockid: "891b629b-8c9c-4ce5-96f1-84df095d89ac",
        deviceparentid: "1377390d-d178-4651-89ea-f847dbaf8747",
        deviceid: "90c06181-d882-47d7-ab3c-d93fbaa122a9",
    },

    {
        blockid: "891b629b-8c9c-4ce5-96f1-84df095d89ac",
        deviceparentid: "1377390d-d178-4651-89ea-f847dbaf8747",
        deviceid: "acfcfcf6-e76c-4f13-9921-8d3b71921983",
    },

    {
        blockid: "ad15d486-8e6e-412e-bbd5-d005a90877bb",
        deviceparentid: "fc78cc5f-fc32-42db-9dac-159874b656dc",
        deviceid: "e3f2f93c-6c71-47c4-ba51-18997d1d7682",
    },

    {
        blockid: "ad15d486-8e6e-412e-bbd5-d005a90877bb",
        deviceparentid: "fc78cc5f-fc32-42db-9dac-159874b656dc",
        deviceid: "1b49b297-b5e3-4c03-9f92-5f40857f7149",
    },

    {
        blockid: "ad15d486-8e6e-412e-bbd5-d005a90877bb",
        deviceparentid: "1f36bf1d-b3a9-4e93-9db4-efcdf5be337a",
        deviceid: "cb591d73-537b-42d6-bfc0-b126238ccc49",
    },

    {
        blockid: "ad15d486-8e6e-412e-bbd5-d005a90877bb",
        deviceparentid: "1f36bf1d-b3a9-4e93-9db4-efcdf5be337a",
        deviceid: "bdbb12d9-9711-4bb8-a705-edd5a385ac6f",
    },

    {
        blockid: "574054b1-a1d5-415b-adcd-e654837922e5",
        deviceparentid: "e726b609-ff33-4b7c-be38-ec8c3f593a60",
        deviceid: "0e3ffafa-1e52-49ed-acfc-6564e13d080e",
    },

    {
        blockid: "574054b1-a1d5-415b-adcd-e654837922e5",
        deviceparentid: "e726b609-ff33-4b7c-be38-ec8c3f593a60",
        deviceid: "b84263ba-e027-4479-9b4e-90ca1364a914",
    },

    {
        blockid: "574054b1-a1d5-415b-adcd-e654837922e5",
        deviceparentid: "b46d8b38-c6b9-4cf8-b786-d71fac2a006d",
        deviceid: "1bc216de-0b5d-4193-b583-f0ba6d0911e6",
    },

    {
        blockid: "574054b1-a1d5-415b-adcd-e654837922e5",
        deviceparentid: "b46d8b38-c6b9-4cf8-b786-d71fac2a006d",
        deviceid: "0ce8e6a6-2fbb-4e4d-ae18-0469042b1574",
    },

    {
        blockid: "a6eb1b17-5da8-421b-997d-25346297b098",
        deviceparentid: "e0906cc3-d812-4a02-a8c2-232263c7eadf",
        deviceid: "f4985ee0-3d5f-45ca-a3db-d5d72d584979",
    },

    {
        blockid: "a6eb1b17-5da8-421b-997d-25346297b098",
        deviceparentid: "e0906cc3-d812-4a02-a8c2-232263c7eadf",
        deviceid: "d2e836c0-8ea0-4c2a-b0f6-57af363f8ae1",
    },

    {
        blockid: "a6eb1b17-5da8-421b-997d-25346297b098",
        deviceparentid: "525860cc-33f4-4dc9-a198-9db12f12961f",
        deviceid: "9ceecb45-dc09-493f-a0e5-334f5692e1ac",
    },

    {
        blockid: "a6eb1b17-5da8-421b-997d-25346297b098",
        deviceparentid: "525860cc-33f4-4dc9-a198-9db12f12961f",
        deviceid: "f5511155-8e2c-4183-8f66-ee628a569053",
    },

    {
        blockid: "7731103e-facf-4c39-8828-a01690f03e82",
        deviceparentid: "44636cfc-146b-4011-a0a0-529644c205c6",
        deviceid: "c0129000-7b73-466d-8643-57a7292bda3f",
    },

    {
        blockid: "7731103e-facf-4c39-8828-a01690f03e82",
        deviceparentid: "2767b9e4-1e3d-4a08-a495-b0fb5a49cb67",
        deviceid: "0c63c496-9f7c-4ba1-a2b2-75f1db4dc3cf",
    },

    {
        blockid: "7731103e-facf-4c39-8828-a01690f03e82",
        deviceparentid: "44636cfc-146b-4011-a0a0-529644c205c6",
        deviceid: "3aad010c-5461-499c-9750-c4c6aefd1d22",
    },

    {
        blockid: "7731103e-facf-4c39-8828-a01690f03e82",
        deviceparentid: "2767b9e4-1e3d-4a08-a495-b0fb5a49cb67",
        deviceid: "2e5167fa-d5fe-4bd9-a6a8-bec72548614c",
    },

    {
        blockid: "19a31346-a564-4de4-936c-d76a1541f63b",
        deviceparentid: "4df001e1-db9c-449a-815a-39ccf4263b6a",
        deviceid: "0a4ec4c8-fbfb-4a55-80b8-c7d855f066df",
    },

    {
        blockid: "19a31346-a564-4de4-936c-d76a1541f63b",
        deviceparentid: "4df001e1-db9c-449a-815a-39ccf4263b6a",
        deviceid: "9fb35fdc-5eb1-49b1-b925-32eca8e86e58",
    },

    {
        blockid: "19a31346-a564-4de4-936c-d76a1541f63b",
        deviceparentid: "09e6875f-48db-4cfa-846e-726c1612f41f",
        deviceid: "aabcb494-f532-440e-b24c-9fdc3be370e4",
    },

    {
        blockid: "19a31346-a564-4de4-936c-d76a1541f63b",
        deviceparentid: "09e6875f-48db-4cfa-846e-726c1612f41f",
        deviceid: "57a8ef29-c8f5-4391-8ea9-f00f1b527b3a",
    },

    {
        blockid: "b58c77b4-62e4-4738-ae5c-f2d7ce3f3fd9",
        deviceparentid: "eb86818d-da56-4917-83c7-8270cbc1acb5",
        deviceid: "270e81c0-8e08-4872-870b-deaf52183c72",
    },

    {
        blockid: "b58c77b4-62e4-4738-ae5c-f2d7ce3f3fd9",
        deviceparentid: "eb86818d-da56-4917-83c7-8270cbc1acb5",
        deviceid: "4402300c-5832-4541-b450-86916c792869",
    },

    {
        blockid: "b58c77b4-62e4-4738-ae5c-f2d7ce3f3fd9",
        deviceparentid: "bbcd1a0e-e899-42dd-834d-e00682c6fd7c",
        deviceid: "66c70abb-753d-45d9-ab03-51168efc3f6e",
    },

    {
        blockid: "b58c77b4-62e4-4738-ae5c-f2d7ce3f3fd9",
        deviceparentid: "bbcd1a0e-e899-42dd-834d-e00682c6fd7c",
        deviceid: "cedf30d8-c182-44e2-9561-a2a894b0a0a5",
    },

    {
        blockid: "34db939b-973a-44eb-be0c-2a3c5bc3ae1f",
        deviceparentid: "a04e69e1-c39b-43f5-8a3a-4d1ab88a2544",
        deviceid: "d4386b44-ef3d-4001-a955-301801c6f7a8",
    },

    {
        blockid: "34db939b-973a-44eb-be0c-2a3c5bc3ae1f",
        deviceparentid: "a04e69e1-c39b-43f5-8a3a-4d1ab88a2544",
        deviceid: "56353acc-42e3-44bd-94a8-e6e5d03f3ef9",
    },

    {
        blockid: "34db939b-973a-44eb-be0c-2a3c5bc3ae1f",
        deviceparentid: "2ce96926-d63c-46f4-8046-67d1b0ef5215",
        deviceid: "9aa2c6b6-e32c-4e3d-a492-9262fa2dffc4",
    },

    {
        blockid: "34db939b-973a-44eb-be0c-2a3c5bc3ae1f",
        deviceparentid: "2ce96926-d63c-46f4-8046-67d1b0ef5215",
        deviceid: "60ab087e-9a09-4817-a601-b0a2a1966705",
    },

    {
        blockid: "f0fabd90-070c-46da-af74-22a4231c4764",
        deviceparentid: "d2718128-39ff-4121-afe8-18083c7bac99",
        deviceid: "e4dec38d-8555-4aeb-b99a-5f067efef80d",
    },

    {
        blockid: "f0fabd90-070c-46da-af74-22a4231c4764",
        deviceparentid: "d2718128-39ff-4121-afe8-18083c7bac99",
        deviceid: "592e2125-5c98-44da-a2dc-9f131b341e80",
    },

    {
        blockid: "f0fabd90-070c-46da-af74-22a4231c4764",
        deviceparentid: "87075010-2507-43e0-b71f-e2b384f77892",
        deviceid: "b179b96f-da9e-4a7d-b81d-1ebf3fb4867f",
    },

    {
        blockid: "f0fabd90-070c-46da-af74-22a4231c4764",
        deviceparentid: "87075010-2507-43e0-b71f-e2b384f77892",
        deviceid: "a08a0a07-c9c1-4464-a2cb-ef2b21fe3c22",
    },

    {
        blockid: "5f6fa080-9d98-4645-9a3d-c5226b7f93cf",
        deviceparentid: "88a9ba0a-7815-44ad-a006-6587bd709999",
        deviceid: "60172fad-b9b0-455e-a49b-136ed14ac5ca",
    },

    {
        blockid: "5f6fa080-9d98-4645-9a3d-c5226b7f93cf",
        deviceparentid: "88a9ba0a-7815-44ad-a006-6587bd709999",
        deviceid: "0f5b5354-1ff5-4c99-8b49-893d4ca4b286",
    },

    {
        blockid: "5f6fa080-9d98-4645-9a3d-c5226b7f93cf",
        deviceparentid: "29572d0f-a84e-45fe-8830-b71c4137ca1c",
        deviceid: "46d60bb0-880c-4519-9761-20be977bb4d7",
    },

    {
        blockid: "5f6fa080-9d98-4645-9a3d-c5226b7f93cf",
        deviceparentid: "29572d0f-a84e-45fe-8830-b71c4137ca1c",
        deviceid: "24048c9f-fe57-42d6-9c62-5a2f1eed91c5",
    },

    {
        blockid: "b8ba704d-fac7-4ab5-ad6b-bcfa44b951dc",
        deviceparentid: "04417668-ea66-4b3c-9238-f9cf6d1b4bdf",
        deviceid: "467c8394-4324-4c22-bb3a-07501f0b07e4",
    },

    {
        blockid: "b8ba704d-fac7-4ab5-ad6b-bcfa44b951dc",
        deviceparentid: "04417668-ea66-4b3c-9238-f9cf6d1b4bdf",
        deviceid: "df210da5-2c23-4c07-95ad-545c14514f92",
    },

    {
        blockid: "f3ac11e8-ab2a-4230-956b-c612ab2d4a4a",
        deviceparentid: "fb280a19-c807-4a64-8931-d2ff09bd2c16",
        deviceid: "cf8c0851-49d2-4fae-a7b0-65ffe02bf3b1",
    },

    {
        blockid: "f3ac11e8-ab2a-4230-956b-c612ab2d4a4a",
        deviceparentid: "fb280a19-c807-4a64-8931-d2ff09bd2c16",
        deviceid: "297e73b5-02f8-4866-8bc4-9f7cb32a1547",
    },

    {
        blockid: "f3ac11e8-ab2a-4230-956b-c612ab2d4a4a",
        deviceparentid: "e845bb28-ac25-457d-af27-a2b1ea3157d6",
        deviceid: "7a9b952b-ea8a-42fe-9d6b-03fe3f30b3c9",
    },

    {
        blockid: "f3ac11e8-ab2a-4230-956b-c612ab2d4a4a",
        deviceparentid: "e845bb28-ac25-457d-af27-a2b1ea3157d6",
        deviceid: "2afac1e0-6b73-42e3-8eb0-2fbe3671905a",
    },

    {
        blockid: "f17f31cf-b6ca-474d-8cdf-e16b6a2849fa",
        deviceparentid: "b4d51a51-c8ea-4be9-8649-affd6522d5a6",
        deviceid: "00df564f-cfe7-4197-ba34-8cdf966f5120",
    },

    {
        blockid: "f17f31cf-b6ca-474d-8cdf-e16b6a2849fa",
        deviceparentid: "b4d51a51-c8ea-4be9-8649-affd6522d5a6",
        deviceid: "5e6bd3ee-fafb-4b45-a013-ce7443cfe86a",
    },

    {
        blockid: "f17f31cf-b6ca-474d-8cdf-e16b6a2849fa",
        deviceparentid: "fc95e42c-ffa4-4847-8121-d6fcf13ae5a6",
        deviceid: "892d0ff9-99c9-45e7-9b73-20afe7d5006e",
    },

    {
        blockid: "f17f31cf-b6ca-474d-8cdf-e16b6a2849fa",
        deviceparentid: "fc95e42c-ffa4-4847-8121-d6fcf13ae5a6",
        deviceid: "eb9b36d7-d1ff-4c8a-b6a5-a35e763397eb",
    },

    {
        blockid: "696c85dd-62cc-4c2c-bf7d-e4134341db38",
        deviceparentid: "8217b84e-d5e9-4494-9686-81d504567bf2",
        deviceid: "9307c8b8-1c06-46db-ba00-a64d616da11c",
    },

    {
        blockid: "696c85dd-62cc-4c2c-bf7d-e4134341db38",
        deviceparentid: "d3de159e-ef04-4c16-8287-793599e5c437",
        deviceid: "57f67576-8f80-45ce-95fc-09c8441e95e3",
    },

    {
        blockid: "696c85dd-62cc-4c2c-bf7d-e4134341db38",
        deviceparentid: "8217b84e-d5e9-4494-9686-81d504567bf2",
        deviceid: "69832612-e027-406a-8740-cad18ec5d82e",
    },

    {
        blockid: "696c85dd-62cc-4c2c-bf7d-e4134341db38",
        deviceparentid: "d3de159e-ef04-4c16-8287-793599e5c437",
        deviceid: "cbbfcc7e-951a-41de-a9f4-0e2bdf4f05af",
    },

    {
        blockid: "91a53add-82ac-4778-920b-a5703ee4f87a",
        deviceparentid: "b4123ee1-881d-45c4-8f0c-5bc01e975a05",
        deviceid: "c30a848a-3301-4224-8ebe-4b87bcbd63b8",
    },

    {
        blockid: "91a53add-82ac-4778-920b-a5703ee4f87a",
        deviceparentid: "b4123ee1-881d-45c4-8f0c-5bc01e975a05",
        deviceid: "2d2adf94-0959-4142-9355-0c4df3f4be43",
    },

    {
        blockid: "91a53add-82ac-4778-920b-a5703ee4f87a",
        deviceparentid: "cf745a76-e8e6-4bb8-bca6-b968da2a5533",
        deviceid: "fe4c180f-da2a-45e3-ad76-0e55aec93f3a",
    },

    {
        blockid: "91a53add-82ac-4778-920b-a5703ee4f87a",
        deviceparentid: "cf745a76-e8e6-4bb8-bca6-b968da2a5533",
        deviceid: "1c6551f8-d4f4-4a9a-a8ba-380af2e7d3a0",
    },

    {
        blockid: "d5f7db2b-cde7-44c7-8f13-08f9cb3c7c94",
        deviceparentid: "d4ef753f-87a3-44ca-a2c7-8ee49e27949f",
        deviceid: "8b26b64f-312c-47fd-816a-5bbe3932148a",
    },

    {
        blockid: "d5f7db2b-cde7-44c7-8f13-08f9cb3c7c94",
        deviceparentid: "d4ef753f-87a3-44ca-a2c7-8ee49e27949f",
        deviceid: "27349f41-2b22-4a1c-9767-a10301ba84ff",
    },

    {
        blockid: "d5f7db2b-cde7-44c7-8f13-08f9cb3c7c94",
        deviceparentid: "b68b39a7-8f79-43e0-841f-17cdefac0e35",
        deviceid: "007ce91f-4569-4bbe-8a5d-8a2d217e5061",
    },

    {
        blockid: "d5f7db2b-cde7-44c7-8f13-08f9cb3c7c94",
        deviceparentid: "b68b39a7-8f79-43e0-841f-17cdefac0e35",
        deviceid: "66c7cbd0-563a-4d66-b2e3-f3d0f5ae0bc3",
    },

    {
        blockid: "de29af4f-1e71-4e0b-9f58-ce0a611f97d5",
        deviceparentid: "3dae9d96-1b6e-4843-b430-2475326a17a5",
        deviceid: "f94708b5-2f92-4fa8-a435-4ba1d9680d3e",
    },

    {
        blockid: "de29af4f-1e71-4e0b-9f58-ce0a611f97d5",
        deviceparentid: "ff3419d3-f1cf-4050-80d9-9d56fa8abeb3",
        deviceid: "a75ff1b7-b174-45ca-be01-63310474dfc6",
    },

    {
        blockid: "de29af4f-1e71-4e0b-9f58-ce0a611f97d5",
        deviceparentid: "3dae9d96-1b6e-4843-b430-2475326a17a5",
        deviceid: "1f6b68f1-c753-47fb-b3f8-fb34dec7dc44",
    },

    {
        blockid: "de29af4f-1e71-4e0b-9f58-ce0a611f97d5",
        deviceparentid: "ff3419d3-f1cf-4050-80d9-9d56fa8abeb3",
        deviceid: "778a471a-2f13-425a-ae76-2ff0f95fbad8",
    },

    {
        blockid: "84c36b3c-1141-4164-93dd-77871bb5b93f",
        deviceparentid: "bd78c434-aca3-4193-b990-a1e179a0d0d3",
        deviceid: "76725d0d-5b34-4da3-aa25-c8a409c9507e",
    },

    {
        blockid: "84c36b3c-1141-4164-93dd-77871bb5b93f",
        deviceparentid: "bd78c434-aca3-4193-b990-a1e179a0d0d3",
        deviceid: "bcb37edd-b84e-4b8a-8936-179ea77d3b8f",
    },

    {
        blockid: "84c36b3c-1141-4164-93dd-77871bb5b93f",
        deviceparentid: "ca2081bd-6f34-4af7-adf9-ffaad895ba32",
        deviceid: "a587b757-a519-4d91-8641-d184509bbb9e",
    },

    {
        blockid: "84c36b3c-1141-4164-93dd-77871bb5b93f",
        deviceparentid: "ca2081bd-6f34-4af7-adf9-ffaad895ba32",
        deviceid: "dbff147d-198c-4a2e-9cf6-d7ea5c3d3cee",
    },

    {
        blockid: "5a03cc2a-e800-4529-a663-a6ebd63c4fc4",
        deviceparentid: "3ff9a5d9-64d3-42f0-a5fb-54a94847f8d6",
        deviceid: "cd4c2f58-5bd9-4410-afc4-0fa645546bd5",
    },

    {
        blockid: "5a03cc2a-e800-4529-a663-a6ebd63c4fc4",
        deviceparentid: "3ff9a5d9-64d3-42f0-a5fb-54a94847f8d6",
        deviceid: "87785867-44d8-45ae-82bf-8b23d296c098",
    },

    {
        blockid: "5a03cc2a-e800-4529-a663-a6ebd63c4fc4",
        deviceparentid: "dd03ad6b-2152-4dfe-86b5-9a51e42726be",
        deviceid: "6cab6579-bd02-45d2-96e8-c718b94851a6",
    },

    {
        blockid: "5a03cc2a-e800-4529-a663-a6ebd63c4fc4",
        deviceparentid: "dd03ad6b-2152-4dfe-86b5-9a51e42726be",
        deviceid: "d51378d2-940b-4571-9725-b1203f9c047b",
    },

    {
        blockid: "a64754ec-74bd-40d5-bed0-dfb9c78552ea",
        deviceparentid: "1796f4f3-262c-46fc-8195-c33a78bb63b7",
        deviceid: "74779579-15d9-45aa-9f23-44b9fbbce3e5",
    },

    {
        blockid: "a64754ec-74bd-40d5-bed0-dfb9c78552ea",
        deviceparentid: "1796f4f3-262c-46fc-8195-c33a78bb63b7",
        deviceid: "ec9140d7-425c-4312-a6f5-89158666eb0f",
    },

    {
        blockid: "a64754ec-74bd-40d5-bed0-dfb9c78552ea",
        deviceparentid: "0bef8ba2-ac7c-42d8-8c97-d40846e069f5",
        deviceid: "890adeb9-0c54-49e0-b932-3d0bc445be73",
    },

    {
        blockid: "a64754ec-74bd-40d5-bed0-dfb9c78552ea",
        deviceparentid: "0bef8ba2-ac7c-42d8-8c97-d40846e069f5",
        deviceid: "1c6362cc-7e11-415c-b58b-bb63dea449d0",
    },

    {
        blockid: "2e03b0bd-cce8-4d42-876d-47aa49ce4407",
        deviceparentid: "ce9d1f10-938e-4227-9462-bcbdd2bc9266",
        deviceid: "af7aa2e9-8ef6-4ff9-9cd4-df507e9560ee",
    },

    {
        blockid: "2e03b0bd-cce8-4d42-876d-47aa49ce4407",
        deviceparentid: "ce9d1f10-938e-4227-9462-bcbdd2bc9266",
        deviceid: "13503b82-81e7-4023-b88f-70f267e9c85a",
    },

    {
        blockid: "2e03b0bd-cce8-4d42-876d-47aa49ce4407",
        deviceparentid: "ca1569db-3697-415c-8539-02167a9f26d5",
        deviceid: "3da5ab74-0fe6-4d1b-a21c-3d7cc9379543",
    },

    {
        blockid: "2e03b0bd-cce8-4d42-876d-47aa49ce4407",
        deviceparentid: "ca1569db-3697-415c-8539-02167a9f26d5",
        deviceid: "754f8287-d139-413a-a1ba-f385ff37f9b9",
    },

    {
        blockid: "0de3d550-3336-437b-91d1-562e65df1ab2",
        deviceparentid: "abf76644-f70f-475f-b1a0-91a939e86a98",
        deviceid: "bcdaee82-ebda-474f-b8d7-39c127489b99",
    },

    {
        blockid: "0de3d550-3336-437b-91d1-562e65df1ab2",
        deviceparentid: "5a942b96-4242-4096-a8f1-c9eeeb11e6c7",
        deviceid: "bb7c153c-712d-430a-bedf-c467c296a068",
    },

    {
        blockid: "0de3d550-3336-437b-91d1-562e65df1ab2",
        deviceparentid: "5a942b96-4242-4096-a8f1-c9eeeb11e6c7",
        deviceid: "c1a02547-54cf-48f8-a019-84c43c611539",
    },

    {
        blockid: "0de3d550-3336-437b-91d1-562e65df1ab2",
        deviceparentid: "abf76644-f70f-475f-b1a0-91a939e86a98",
        deviceid: "2a255a1b-c3af-4afb-8c4d-3e9aa383546d",
    },

    {
        blockid: "50d21fa5-e3c7-4e04-9d0f-0c06ccf92400",
        deviceparentid: "0497642f-35f5-47ac-ac56-cdfbdcf31e1e",
        deviceid: "9f62a361-5352-496a-93dc-927ebe0053f2",
    },

    {
        blockid: "50d21fa5-e3c7-4e04-9d0f-0c06ccf92400",
        deviceparentid: "0497642f-35f5-47ac-ac56-cdfbdcf31e1e",
        deviceid: "9d26e912-87ca-4c50-832a-0998f8a2fd3f",
    },

    {
        blockid: "50d21fa5-e3c7-4e04-9d0f-0c06ccf92400",
        deviceparentid: "90494c0c-c31a-4a6d-a922-10b8328bc6ed",
        deviceid: "2516b70f-d8ab-4d3f-acae-5d03652aa173",
    },

    {
        blockid: "50d21fa5-e3c7-4e04-9d0f-0c06ccf92400",
        deviceparentid: "90494c0c-c31a-4a6d-a922-10b8328bc6ed",
        deviceid: "cd951570-7dc7-48af-8fb5-d9696269d4fd",
    },

    {
        blockid: "70f2e84b-3c2a-47c2-a014-8a621b88a72b",
        deviceparentid: "223a366a-0b8d-45c1-b03d-535ea3394b5f",
        deviceid: "6e79c0f3-5bd2-450b-b538-2483b77f32de",
    },

    {
        blockid: "70f2e84b-3c2a-47c2-a014-8a621b88a72b",
        deviceparentid: "223a366a-0b8d-45c1-b03d-535ea3394b5f",
        deviceid: "ade99340-5fd3-478e-8fe8-978adacaac31",
    },

    {
        blockid: "70f2e84b-3c2a-47c2-a014-8a621b88a72b",
        deviceparentid: "2c0d0271-a584-4d8e-add5-17ef4d10a16a",
        deviceid: "20fa6dfe-5fb0-4c1a-8ee1-2c606ad2e7ec",
    },

    {
        blockid: "70f2e84b-3c2a-47c2-a014-8a621b88a72b",
        deviceparentid: "2c0d0271-a584-4d8e-add5-17ef4d10a16a",
        deviceid: "70510ebc-50f1-4f58-a3de-b0f53857b164",
    },

    {
        blockid: "9bcaf0a4-9633-46f7-a730-7c6c4f8b030c",
        deviceparentid: "9084ed2b-62a4-46b7-bb3b-3e45f34c3c90",
        deviceid: "f7e99ecd-eeb9-4e1d-9df4-e0a6ddb3a9e4",
    },

    {
        blockid: "9bcaf0a4-9633-46f7-a730-7c6c4f8b030c",
        deviceparentid: "9084ed2b-62a4-46b7-bb3b-3e45f34c3c90",
        deviceid: "d295fb4f-1eac-4bf9-9ced-0786fe77a582",
    },

    {
        blockid: "9bcaf0a4-9633-46f7-a730-7c6c4f8b030c",
        deviceparentid: "7f713a0f-ea35-4e09-a444-caed00e34ee9",
        deviceid: "bcf50807-af13-42b5-b096-7cdeb4004d48",
    },

    {
        blockid: "9bcaf0a4-9633-46f7-a730-7c6c4f8b030c",
        deviceparentid: "7f713a0f-ea35-4e09-a444-caed00e34ee9",
        deviceid: "3e36e653-e75f-4793-8512-c4ab608effb7",
    },
];
exports = { data };
