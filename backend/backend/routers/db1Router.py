class db1Router:
    """
    A router to control all database operations on models in the
    db1 application.
    """

    def db_for_read(self, model, **hints):
        """
        Attempts to read db1 models go to db1.
        """
        if model._meta.app_label == 'finance_backend':
            return 'db1'
        return None

    def db_for_write(self, model, **hints):
        """
        Attempts to write db1 models go to db1.
        """
        if model._meta.app_label == 'finance_backend':
            return 'db1'
        return None

    def allow_relation(self, obj1, obj2, **hints):
        """
        Allow relations if a model in the db1 app is involved.
        """
        if obj1._meta.app_label == 'finance_backend' or \
           obj2._meta.app_label == 'finance_backend':
            return True
        return None

    def allow_migrate(self, db, app_label, model_name=None, **hints):
        """
        Make sure the db1 app only appears in the 'db1'
        database.
        """
        if app_label == 'finance_backend':
            return db == 'db1'
        return None
