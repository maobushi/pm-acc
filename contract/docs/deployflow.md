```mermaid
sequenceDiagram
    participant MarketCreator as Market Creator
    participant Frontend as Frontend
    participant PMTFactory as PMT Factory
    participant PMT as PMT Contract
     participant OracleFactory as Oracle Factory

    MarketCreator ->> Frontend: sendInfo
    Frontend ->> PMTFactory: sendInfo
    PMTFactory ->> PMT: deploy
    PMT -->> Frontend: marketAddress
```